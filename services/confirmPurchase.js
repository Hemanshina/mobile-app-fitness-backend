const confirmPurchaseTemplate = (formattedLinks) => {
  return `

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  ><head
    ><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta
      http-equiv="X-UA-Compatible"
      content="IE=edge"
    /><meta name="format-detection" content="telephone=no" /><meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    /><title>Checkout</title
    ><style type="text/css" emogrify="no">
      #outlook a {
        padding: 0;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      table td {
        border-collapse: collapse;
        mso-line-height-rule: exactly;
      }
      .editable.image {
        font-size: 0 !important;
        line-height: 0 !important;
      }
      .nl2go_preheader {
        display: none !important;
        mso-hide: all !important;
        mso-line-height-rule: exactly;
        visibility: hidden !important;
        line-height: 0px !important;
        font-size: 0px !important;
      }
      body {
        width: 100% !important;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        margin: 0;
        padding: 0;
      }
      img {
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      a img {
        border: none;
      }
      table {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      th {
        font-weight: normal;
        text-align: left;
      }
      *[class="gmail-fix"] {
        display: none !important;
      }</style
    ><style type="text/css" emogrify="no">
      @media (max-width: 600px) {
        .gmx-killpill {
          content: " 03D1";
        }
      }</style
    ><style type="text/css" emogrify="no">
      @media (max-width: 600px) {
        .gmx-killpill {
          content: " 03D1";
        }
        .r0-o {
          border-style: solid !important;
          margin: 0 auto 0 0 !important;
          width: 100% !important;
        }
        .r1-i {
          background-color: #ffffff !important;
        }
        .r2-c {
          box-sizing: border-box !important;
          text-align: center !important;
          valign: top !important;
          width: 100% !important;
        }
        .r3-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 100% !important;
        }
        .r4-i {
          padding-bottom: 20px !important;
          padding-left: 15px !important;
          padding-right: 15px !important;
          padding-top: 20px !important;
        }
        .r5-c {
          box-sizing: border-box !important;
          display: block !important;
          width: 100% !important;
        }
        .r6-o {
          border-style: solid !important;
          width: 100% !important;
        }
        .r7-i {
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .r8-c {
          box-sizing: border-box !important;
          text-align: left !important;
          width: 100% !important;
        }
        .r9-i {
          padding-top: 15px !important;
          text-align: left !important;
        }
        .r10-c {
          box-sizing: border-box !important;
          text-align: center !important;
          width: 100% !important;
        }
        .r11-i {
          padding-bottom: 0px !important;
          padding-top: 0px !important;
        }
        .r12-i {
          padding-left: 0px !important;
          padding-right: 0px !important;
          padding-top: 20px !important;
        }
        .r13-i {
          padding-left: 16px !important;
          text-align: left !important;
        }
        .r14-i {
          padding-left: 16px !important;
          padding-top: 15px !important;
          text-align: left !important;
        }
        .r15-i {
          background-color: #eff2f7 !important;
          padding-bottom: 20px !important;
          padding-left: 15px !important;
          padding-right: 15px !important;
          padding-top: 20px !important;
        }
        .r16-i {
          color: #3b3f44 !important;
          padding-bottom: 0px !important;
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r17-i {
          color: #3b3f44 !important;
          padding-bottom: 0px !important;
          padding-top: 0px !important;
          text-align: center !important;
        }
        .r18-i {
          padding-bottom: 15px !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
          padding-top: 0px !important;
        }
        .r19-c {
          box-sizing: border-box !important;
          text-align: center !important;
          valign: top !important;
          width: 129px !important;
        }
        .r20-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 129px !important;
        }
        body {
          -webkit-text-size-adjust: none;
        }
        .nl2go-responsive-hide {
          display: none;
        }
        .nl2go-body-table {
          min-width: unset !important;
        }
        .mobshow {
          height: auto !important;
          overflow: visible !important;
          max-height: unset !important;
          visibility: visible !important;
          border: none !important;
        }
        .resp-table {
          display: inline-table !important;
        }
        .magic-resp {
          display: table-cell !important;
        }
      }</style
    ><style type="text/css">
      p,
      h1,
      h2,
      h3,
      h4,
      ol,
      ul {
        margin: 0;
      }
      a,
      a:link {
        color: #fcb900;
        text-decoration: underline;
      }
      .nl2go-default-textstyle {
        color: #3b3f44;
        font-family: times new roman, times, serif;
        font-size: 16px;
        line-height: 1.5;
        word-break: break-word;
      }
      .default-button {
        color: #000000;
        font-family: times new roman, times, serif;
        font-size: 16px;
        font-style: normal;
        font-weight: normal;
        line-height: 1.15;
        text-decoration: none;
        word-break: break-word;
      }
      .default-heading1 {
        color: #1f2d3d;
        font-family: georgia, serif, Arial;
        font-size: 36px;
        word-break: break-word;
      }
      .default-heading2 {
        color: #1f2d3d;
        font-family: georgia, serif, Arial;
        font-size: 32px;
        word-break: break-word;
      }
      .default-heading3 {
        color: #1f2d3d;
        font-family: georgia, serif, Arial;
        font-size: 24px;
        word-break: break-word;
      }
      .default-heading4 {
        color: #1f2d3d;
        font-family: georgia, serif, Arial;
        font-size: 18px;
        word-break: break-word;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .no-show-for-you {
        border: none;
        display: none;
        float: none;
        font-size: 0;
        height: 0;
        line-height: 0;
        max-height: 0;
        mso-hide: all;
        overflow: hidden;
        table-layout: fixed;
        visibility: hidden;
        width: 0;
      }</style
    ><!--[if mso
      ]><xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG /> <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml><!
    [endif]--></head
  ><body
    bgcolor="#ffffff"
    text="#3b3f44"
    link="#fcb900"
    yahoo="fix"
    style="background-color: #ffffff;"
  >
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      role="presentation"
      class="nl2go-body-table"
      width="100%"
      style="background-color: #ffffff; width: 100%;"
      ><tr
        ><td>
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            width="100%"
            align="left"
            class="r0-o"
            style="table-layout: fixed; width: 100%;"
            ><tr
              ><td valign="top" class="r1-i" style="background-color: #ffffff;">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%;"
                  ><tr
                    ><td
                      class="r4-i"
                      style="padding-bottom: 20px; padding-top: 20px;"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        ><tr
                          ><th
                            width="100%"
                            valign="top"
                            class="r5-c"
                            style="font-weight: normal;"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r6-o"
                              style="table-layout: fixed; width: 100%;"
                              ><tr
                                ><td
                                  valign="top"
                                  class="r7-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                    ><tr
                                      ><td class="r8-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r0-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td
                                              align="left"
                                              valign="top"
                                              class="r9-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: times new roman,
                                                  times, serif;
                                                font-size: 16px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-top: 15px;
                                                text-align: left;
                                              "
                                            >
                                              <div
                                                ><h2
                                                  class="default-heading2"
                                                  style="
                                                    margin: 0;
                                                    color: #1f2d3d;
                                                    font-family: georgia, serif,
                                                      Arial;
                                                    font-size: 32px;
                                                    word-break: break-word;
                                                  "
                                                  >Thank You for Your
                                                  Purchase!</h2
                                                ></div
                                              >
                                            </td>
                                          </tr></table
                                        ></td
                                      >
                                    </tr></table
                                  ></td
                                >
                              </tr></table
                            ></th
                          >
                        </tr></table
                      ></td
                    >
                  </tr></table
                ><table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%;"
                  ><tr
                    ><td
                      class="r4-i"
                      style="padding-bottom: 20px; padding-top: 20px;"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        ><tr
                          ><th
                            width="100%"
                            valign="top"
                            class="r5-c"
                            style="font-weight: normal;"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r6-o"
                              style="table-layout: fixed; width: 100%;"
                              ><tr
                                ><td
                                  valign="top"
                                  class="r7-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                    ><tr
                                      ><td class="r10-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r3-o"
                                          style="table-layout: fixed;"
                                          ><tr
                                            ><td
                                              class="r11-i"
                                              style="height: 3px;"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                role="presentation"
                                                ><tr
                                                  ><td
                                                    ><table
                                                      width="100%"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      valign=""
                                                      class="r11-i"
                                                      height="3"
                                                      style="
                                                        border-top-style: solid;
                                                        background-clip: border-box;
                                                        border-top-color: #4a4a4a;
                                                        border-top-width: 3px;
                                                        font-size: 3px;
                                                        line-height: 3px;
                                                      "
                                                      ><tr
                                                        ><td
                                                          height="0"
                                                          style="
                                                            font-size: 0px;
                                                            line-height: 0px;
                                                          "
                                                          >­</td
                                                        >
                                                      </tr></table
                                                    ></td
                                                  >
                                                </tr></table
                                              ></td
                                            >
                                          </tr></table
                                        ></td
                                      >
                                    </tr></table
                                  ></td
                                >
                              </tr></table
                            ></th
                          >
                        </tr></table
                      ></td
                    >
                  </tr></table
                ><table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%;"
                  ><tr
                    ><td class="r12-i" style="padding-top: 20px;">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        ><tr
                          ><th
                            width="100%"
                            valign="top"
                            class="r5-c"
                            style="font-weight: normal;"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r6-o"
                              style="table-layout: fixed; width: 100%;"
                              ><tr
                                ><td valign="top" class="r7-i">
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                    ><tr
                                      ><td class="r8-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          align="left"
                                          class="r0-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td valign="top">
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                role="presentation"
                                                ><tr
                                                  ><td
                                                    class="r8-c"
                                                    align="left"
                                                  >
                                                    <table
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      width="100%"
                                                      class="r0-o"
                                                      style="
                                                        table-layout: fixed;
                                                        width: 100%;
                                                      "
                                                      ><tr
                                                        ><td
                                                          align="left"
                                                          valign="top"
                                                          class="r13-i nl2go-default-textstyle"
                                                          style="
                                                            color: #3b3f44;
                                                            font-family: times
                                                                new roman,
                                                              times, serif;
                                                            font-size: 16px;
                                                            line-height: 1.5;
                                                            word-break: break-word;
                                                            padding-left: 16px;
                                                            text-align: left;
                                                          "
                                                        >
                                                          <div
                                                            ><p
                                                              style="margin: 0;"
                                                              >Dear Customer,</p
                                                            ></div
                                                          >
                                                        </td>
                                                      </tr></table
                                                    ></td
                                                  > </tr
                                                ><tr
                                                  ><td
                                                    class="r8-c"
                                                    align="left"
                                                  >
                                                    <table
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      width="100%"
                                                      class="r0-o"
                                                      style="
                                                        table-layout: fixed;
                                                        width: 100%;
                                                      "
                                                      ><tr
                                                        ><td
                                                          align="left"
                                                          valign="top"
                                                          class="r14-i nl2go-default-textstyle"
                                                          style="
                                                            color: #3b3f44;
                                                            font-family: times
                                                                new roman,
                                                              times, serif;
                                                            font-size: 16px;
                                                            line-height: 1.5;
                                                            word-break: break-word;
                                                            padding-left: 16px;
                                                            padding-top: 15px;
                                                            text-align: left;
                                                          "
                                                        >
                                                          <div
                                                            ><p
                                                              style="margin: 0;"
                                                              >Thank you for
                                                              choosing AvionDigital!
                                                              Your order
                                                              checkout was
                                                              completed
                                                              successfully . We
                                                              appreciate your
                                                              support.</p
                                                            ><p
                                                              style="margin: 0;"
                                                            >
                                                            </p
                                                            ><p
                                                              style="margin: 0;"
                                                              >If you have any
                                                              questions, feel
                                                              free to contact
                                                              us. Looking
                                                              forward to serving
                                                              you again!.</p
                                                            ><p
                                                              style="margin: 0;"
                                                            >
                                                            </p
                                                            ><p
                                                              style="margin: 0;"
                                                              >Below are your
                                                              source code
                                                              links:</p
                                                            >

                                                            </br>

                                                            <p
                                                            style="margin: 0;"
                                                            >${formattedLinks}</p
                                                          >
                                                            
                                                            <p
                                                              style="margin: 0;"
                                                            >
                                                            </p
                                                            ><p
                                                              style="margin: 0;"
                                                            >
                                                            </p
                                                            ><p
                                                              style="margin: 0;"
                                                              >Best regards,</p
                                                            ><p
                                                              style="margin: 0;"
                                                              >AvionDigital.</p
                                                            ><p
                                                              style="margin: 0;"
                                                            >
                                                            </p
                                                          ></div>
                                                        </td> </tr></table
                                                  ></td> </tr></table
                                            ></td> </tr></table
                                      ></td> </tr></table
                                ></td> </tr></table
                          ></th> </tr></table
                    ></td> </tr></table
                ><table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%;"
                  ><tr
                    ><td
                      class="r15-i"
                      style="
                        background-color: #eff2f7;
                        padding-bottom: 20px;
                        padding-top: 20px;
                      "
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                        ><tr
                          ><th
                            width="100%"
                            valign="top"
                            class="r5-c"
                            style="font-weight: normal;"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r6-o"
                              style="table-layout: fixed; width: 100%;"
                              ><tr
                                ><td
                                  valign="top"
                                  class="r7-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                    ><tr
                                      ><td class="r8-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r0-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td
                                              align="center"
                                              valign="top"
                                              class="r16-i nl2go-default-textstyle"
                                              style="
                                                font-family: times new roman,
                                                  times, serif;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div
                                                ><p style="margin: 0;"
                                                  ><span
                                                    style="
                                                      background-color: #eff2f7;
                                                      color: #000000;
                                                      font-size: 28px;
                                                    "
                                                    >Code</span
                                                  ><span
                                                    style="font-size: 28px;"
                                                    >Shop</span
                                                  ></p
                                                ></div
                                              >
                                            </td>
                                          </tr></table
                                        ></td
                                      > </tr
                                    ><tr
                                      ><td class="r8-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r0-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td
                                              align="center"
                                              valign="top"
                                              class="r17-i nl2go-default-textstyle"
                                              style="
                                                font-family: times new roman,
                                                  times, serif;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                text-align: center;
                                              "
                                            >
                                              <div
                                                ><p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                  "
                                                  >All Rights Reserved!</p
                                                ></div
                                              >
                                            </td>
                                          </tr></table
                                        ></td
                                      > </tr
                                    ><tr
                                      ><td class="r10-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          align="center"
                                          class="r3-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                          ><tr
                                            ><td
                                              valign="top"
                                              class="r18-i"
                                              style="padding-bottom: 15px;"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                role="presentation"
                                                ><tr
                                                  ><td
                                                    class="r19-c"
                                                    align="center"
                                                  >
                                                    <table
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      width="129"
                                                      class="r20-o"
                                                      style="
                                                        table-layout: fixed;
                                                      "
                                                      ><tr
                                                        ><td
                                                          height="48"
                                                          style="
                                                            font-size: 0px;
                                                            line-height: 0px;
                                                          "
                                                        >
                                                         </td> </tr></table
                                                  ></td> </tr></table
                                            ></td> </tr></table
                                      ></td> </tr></table
                                ></td> </tr></table
                          ></th> </tr></table
                    ></td> </tr></table
              ></td> </tr></table
        ></td> </tr></table></body
></html>

    `;
};

module.exports = {
    confirmPurchaseTemplate
}
