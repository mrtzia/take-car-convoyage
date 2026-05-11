import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, email, telephone, type, lieu, vehicule, infos } = body;

    const { error } = await resend.emails.send({
      from: "Take Car Convoyage <onboarding@resend.dev>",
      to: ["eliott.martinez@icloud.com"],
      subject: `Nouveau devis — ${nom}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f5f4f0; border-radius: 12px;">
          <h2 style="color: #111111; margin-bottom: 24px;">Nouvelle demande de devis</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #666; font-size: 13px; width: 40%;">Nom</td><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #111; font-size: 13px;"><strong>${nom}</strong></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #666; font-size: 13px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #111; font-size: 13px;">${email}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #666; font-size: 13px;">Téléphone</td><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #111; font-size: 13px;">${telephone}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #666; font-size: 13px;">Type de client</td><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #111; font-size: 13px;">${type}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #666; font-size: 13px;">Lieu de prise en charge</td><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #111; font-size: 13px;">${lieu}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #666; font-size: 13px;">Véhicule</td><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #111; font-size: 13px;">${vehicule}</td></tr>
            <tr><td style="padding: 10px 0; color: #666; font-size: 13px; vertical-align: top;">Informations complémentaires</td><td style="padding: 10px 0; color: #111; font-size: 13px;">${infos || "—"}</td></tr>
          </table>

          <p style="margin-top: 32px; font-size: 11px; color: #999;">Envoyé depuis takecarconvoyage.fr</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
