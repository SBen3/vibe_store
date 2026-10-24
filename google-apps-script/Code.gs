/**
 * Google Sheets order receiver + Telegram notification.
 * 1. Create a Google Sheet. Extensions > Apps Script. Paste this file.
 * 2. Change SECRET (same value as SHEETS_SECRET in .env.local).
 * 3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 * 4. Copy the web app URL into GOOGLE_SCRIPT_URL.
 * After editing this file: Deploy > Manage deployments > pencil > New version.
 * Telegram is optional: leave the two values empty to skip it.
 */
const SHEET_NAME = "الطلبات";
const SECRET = "CHANGE_ME";
const TELEGRAM_TOKEN = "";
const TELEGRAM_CHAT_ID = "";

const STATUSES = ["جديدة", "مؤكدة", "ملغاة", "تم الشحن", "تم التسليم", "مرتجعة"];
const HEADERS = [
  "المرجع", "التاريخ", "الحالة", "الاسم", "الهاتف", "الولاية", "البلدية", "العنوان",
  "التوصيل", "المنتج", "اللون", "المقاس", "الكمية", "المجموع الفرعي", "مصاريف التوصيل", "المبلغ عند الاستلام", "ملاحظات",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return out({ ok: false, error: "unauthorized" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setRightToLeft(true);
      // Status dropdown for the whole column
      sheet.getRange(2, 3, 1000, 1).setDataValidation(
        SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build()
      );
    }

    const row = sheet.getLastRow() + 1;
    sheet.getRange(row, 5).setNumberFormat("@"); // keep the leading 0 of phone numbers
    sheet.getRange(row, 1, 1, HEADERS.length).setValues([[
      d.ref, d.createdAt, d.status, d.fullName, d.phone, d.wilaya, d.commune, d.address,
      d.deliveryType, d.product, d.color, d.size, d.quantity, d.subtotal, d.delivery, d.total, d.notes,
    ]]);
    notify(d);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function notify(d) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) return;
  const text =
    "🛍 طلب جديد " + d.ref + "\n" +
    d.fullName + " | " + d.phone + "\n" +
    d.wilaya + " - " + d.commune + " (" + d.deliveryType + ")\n" +
    d.product + " " + d.color + " " + d.size + " x" + d.quantity + "\n" +
    "المبلغ: " + d.total + " دج";
  try {
    UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage", {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text }),
      muteHttpExceptions: true,
    });
  } catch (err) {}
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
