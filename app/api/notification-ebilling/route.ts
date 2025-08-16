// app/api/ebilling/callback/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const expectedFields = [
      "billingid", "merchantid", "customerid", "transactionid", "reference",
      "payer_id", "payer_code", "paymentsystem", "data5", "amount",
      "subpaymentsystem", "paymentsystemtoken", "shortdescription",
      "payername", "payeremail", "createdat", "state"
    ];

    const payload: Record<string, string> = {};
    for (const field of expectedFields) {
      payload[field] = formData.get(field)?.toString() || "";
    }

    // Log pour vérifier la réception
    console.log("📩 Callback Ebilling reçu :", payload);

    // TODO : Enregistrer en base, mettre à jour la facture, etc.

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("❌ Erreur dans le callback ebilling :", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
