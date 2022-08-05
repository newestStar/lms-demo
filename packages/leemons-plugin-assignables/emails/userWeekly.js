function activity(title, t1, t2, t3, t4, t5, texts) {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <meta name="robots" content="noindex,nofollow" />
    <meta property="og:title" content="leemons" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css?family=Lexend"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />

    <style type="text/css">
      body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }

      h1,
      h2,
      p {
        margin: 0 !important;
      }
    </style>
  </head>
  <body class="body" bgcolor="#fff" style="background-color: #fff">
    <table
      cellpadding="0"
      cellspacing="0"
      align="center"
      width="100%"
      bgcolor="#fff"
      style="max-width: 600px"
    >
      <tr>
        <td>
          <table
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            bgcolor="#F7F8FA"
            style="background-color: #f7f8fa"
          >
            <tr>
              <td style="padding: 10px 0"></td>
            </tr>
          </table>

          <table
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            bgcolor="#F7F8FA"
            style="background-color: #f7f8fa"
          >
          <tr>
              <td
                align="center"
                style="
                  text-align: center;
                  padding: 32px 45px 0px;
                  font-family: 'Lexend', Century Gothic, CenturyGothic,
                    AppleGothic, sans-serif;
                  font-size: 20px;
                  line-height: 25px;
                  font-weight: 400;
                  color: #212b3d;
                "
              >
                ${title}
              </td>
            </tr>
            <tr>
              <td
                align="center"
                style="
                  text-align: center;
                  padding: 10px 45px 0px;
                  font-family: 'Lexend', Century Gothic, CenturyGothic,
                    AppleGothic, sans-serif;
                "
              >
                <img
                  src="{{it.__logoUrl}}"
                  height="96"
                  width="96"
                  style="border-radius: 50%"
                />
              </td>
            </tr>
            <tr>
            <td
                align="center"
                style="
                  text-align: center;
                  padding: 24px 45px 32px;
                  font-family: 'Inter', Verdana, sans-serif;
                  font-size: 14px;
                  line-height: 22.4px;
                  color: #5b6577;
                "
              >
               ${t1}
              </td>
            </tr>
          </table>
          <table
        cellpadding="0"
        cellspacing="0"
        align="center"
        width="100%"
        bgcolor="#F7F8FA"
        style="background-color: #f7f8fa"
      >
        <tr>
          <td align="center" style="text-align: center; padding: 15px 25px">
            <table
              cellpadding="0"
              cellspacing="0"
              align="center"
              width="100%"
              bgcolor="#fff"
              style="background-color: #fff"
            >
              <!-- TABLA -->
              {{ @if (it.nextInstances.length > 0) }}
              <tr>
                <td
                  align="center"
                  style="padding-top: 16px; padding-bottom: 24px; padding-inline: 38.5px"
                >
                  <div
                    style="
                          text-align: start;
                        "
                  >
                        <span
                          style="
                            padding: 5px 16px 8px;
                            font-family: 'Inter', Verdana, sans-serif;
                            font-size: 14px;
                            line-height: 24px;
                            font-weight: 600;
                            color: #212b3d;
                          "
                        >${texts.upcomingDeliveries}</span
                        >
                        {{@each(it.nextInstances) => instance}}
                          <div
                            style="
                                  display: flex;
                                  padding: 6px 16px;
                                  align-items: center;
                                  border-top: 2px solid #edeff5;
                                "
                          >
                            <div style="border: 1px solid #b9bec4">
                              <img
                                height="36"
                                width="36"
                                src="{{instance.asset.url}}"
                              />
                            </div>
                            <span
                              style="
                                    margin-left: 8px;
                                    font-family: 'Inter', Verdana, sans-serif;
                                    font-size: 14px;
                                    line-height: 16px;
                                    color: #212b3d;
                                  "
                            >{{instance.asset.name}}</span
                            >
                            <div>
                              <div
                                style="
                                      margin-left: 10px;
                                      height: 26px;
                                      width: 26px;
                                      border-radius: 50%;
                                      background-color: {{ @if (instance.classes.length === 1) }}{{ instance.classes[0].color }};{{ #else }}#67728E;{{ /if}}
                                    "
                              ></div>
                            </div>
                            <span
                              style="
                                    margin-left: 16px;
                                    font-family: 'Inter', Verdana, sans-serif;
                                    font-size: 14px;
                                    line-height: 16px;
                                    color: #212b3d;
                                  "
                            >
                            {{ @if (instance.classes.length === 1) }}
                                    {{ instance.classes[0].subject.name }}
                                {{ #else }}
                                  ${texts.multiSubjects}
                                {{ /if}}
                            </span>
                            <span
                              style="
                                    margin-left: 25px;
                                    font-family: 'Lexend', Verdana, sans-serif;
                                    font-size: 14px;
                                    line-height: 16px;
                                    font-weight: 500;
                                    color: {{instance.timeColor}};
                                  "
                            >
                                ${texts.expStart} {{instance.time}} {{ @if (instance.timeUnit === 'days') }}
                                    ${texts.expDays}
                                {{ #else }}
                                  ${texts.expHours}
                                {{ /if}}
                            </span>
                          </div>
                        {{/each}}

                  </div>
                </td>
              </tr>
              {{ /if }}
              <!-- BOTON -->
              <tr>
                <td
                  align="center"
                  style="
                        text-align: center;
                        padding: 16px 45px 0px;
                        height: 38px;
                        font-family: 'Lexend', Century Gothic, CenturyGothic,
                          AppleGothic, sans-serif;
                      "
                >
                  <a
                    href="{{it.btnUrl}}"
                    target="_blank"
                    style="
                          text-decoration: none;
                          font-size: 14px;
                          line-height: 18px;
                          font-weight: 600;
                          color: #fff;
                          background-color: #3b76cc;
                          padding: 10px 32px;
                          border-radius: 25px;
                          font-family: 'Lexend', Century Gothic, CenturyGothic,
                            AppleGothic, sans-serif;
                        "
                  >
                    ${t2}
                  </a>
                </td>
              </tr>
              <!-- TEXT -->
              <tr>
                <td
                  align="center"
                  style="
                        text-align: center;
                        padding: 16px 24px 24px;
                        font-family: 'Inter', Century Gothic, CenturyGothic,
                          AppleGothic, sans-serif;
                        font-size: 14px;
                        line-height: 22px;
                        font-weight: 400;
                        color: #5b6577;
                      "
                >
                  ${t3}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
          <table
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            bgcolor="#F7F8FA"
            style="
              background-color: #f7f8fa;
              font-family: 'Inter', Century Gothic, CenturyGothic, AppleGothic,
                sans-serif;
              font-size: 14px;
              line-height: 18.2px;
              font-weight: 400;
              color: #5b6577;
            "
          >
            <tr>
              <td align="center" style="text-align: center; padding-top: 18px">
                ${t4}
              </td>
            </tr>

          </table>
          <table
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            bgcolor="#F7F8FA"
            style="background-color: #f7f8fa"
          >
            <tr>
              <td
                align="center"
                style="text-align: center; padding: 26px 25px 32px"
              >
                <a
                  href="#"
                  target="_blank"
                  style="
                    text-decoration: none;
                    font-family: 'Inter', Verdana, sans-serif;
                    font-size: 14px;
                    line-height: 18px;
                    font-weight: 400;
                    color: #636d7d;
                  "
                >
                  ${t5}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

module.exports = {
  es: activity(
    'Aquí tienes tus actividades pendientes',
    'Esta información puede haber cambiado, revisa siempre tus actividades en curso para no perderte nada.',
    'Revisar mis actividades',
    'Puedes cambiar tus preferencias de correo desde tu cuenta de usuario.',
    'Enviado por {{it.__from}}',
    '', // Política de privacidad
    {
      upcomingDeliveries: 'Próximas entregas',
      expStart: 'dentro de',
      expDays: 'días',
      expHours: 'horas',
      multiSubjects: 'Multi-Asignatura',
    }
  ),
  en: activity(
    'Have a look to your pending activities',
    "This information may have changed, always check your current activities so you don't miss anything.",
    'Review my activities',
    'You can change your email preferences from your user account',
    'Sent to {{it.__from}}',
    '', // Privacy policy
    {
      upcomingDeliveries: 'Upcoming deliveries',
      expStart: 'within',
      expDays: 'days',
      expHours: 'hours',
      multiSubjects: 'Multi-Subject',
    }
  ),
};
