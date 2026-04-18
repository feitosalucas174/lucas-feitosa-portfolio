import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

// Transporter do Gmail via SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const PROJECT_LABELS: Record<string, string> = {
  landing: 'Site / Landing Page',
  web:     'Sistema Web',
  mobile:  'App Mobile',
  api:     'API / Backend',
  ia:      'Integração com IA',
  outro:   'Outro',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, projectType, message } = body

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      )
    }

    const projectLabel = PROJECT_LABELS[projectType] ?? projectType

    await transporter.sendMail({
      from:    `"Portfólio" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfólio] Nova mensagem de ${name} — ${projectLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:linear-gradient(135deg,#3b82f6,#1d4ed8);padding:28px 32px;border-radius:12px 12px 0 0">
            <h1 style="margin:0;color:#fff;font-size:22px">Nova mensagem do portfólio</h1>
          </div>
          <div style="background:#f8fafc;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:10px 0;color:#64748b;font-size:13px;width:130px;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Nome</td>
                <td style="padding:10px 0;font-size:15px;font-weight:600">${name}</td>
              </tr>
              <tr style="border-top:1px solid #e2e8f0">
                <td style="padding:10px 0;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em">E-mail</td>
                <td style="padding:10px 0;font-size:15px"><a href="mailto:${email}" style="color:#3b82f6">${email}</a></td>
              </tr>
              <tr style="border-top:1px solid #e2e8f0">
                <td style="padding:10px 0;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Projeto</td>
                <td style="padding:10px 0;font-size:15px">${projectLabel}</td>
              </tr>
              <tr style="border-top:1px solid #e2e8f0">
                <td style="padding:10px 0;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;vertical-align:top">Mensagem</td>
                <td style="padding:10px 0;font-size:15px;line-height:1.6;white-space:pre-wrap">${message}</td>
              </tr>
            </table>
            <p style="margin-top:24px;padding-top:20px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8">
              Responda este e-mail para falar diretamente com ${name}.
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[Contact API error]', err)
    return NextResponse.json({ error: 'Erro ao enviar mensagem.' }, { status: 500 })
  }
}
