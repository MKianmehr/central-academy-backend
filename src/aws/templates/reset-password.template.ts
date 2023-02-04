export const template = (
    { name,
        requestTypeMessage,
        pleaseMessage,
        infoMessage,
        url,
        buttonText,
        academyMessage
    }: {
        name: string;
        requestTypeMessage: string;
        pleaseMessage: string;
        infoMessage: string;
        url: string;
        buttonText: string;
        academyMessage: string;
    }) => (
    `
    <div>
        <tbody>
            <tr>
                <td>&nbsp;</td>
                <td width="600">
                    <table style="background-color:#fff" width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td style="border-bottom:1px solid #cccccc;padding:24px">

                                    <!-- <img style="display:block;max-height:28px;width:auto"
                                        src="https://ci3.googleusercontent.com/proxy/beDc9aZ_YaqpbDRKIvQ8EaMC3MlwEpSYTV4Y9eiobp8y-ZNOIV0kuiqxL9lT5gP0P5SCkRAupSfpSLoR-EhnnZs=s0-d-e1-ft#https://s.udemycdn.com/email/logo-udemy-v3.png"
                                        alt="Udemy" class="CToWUd" data-bit="iit" width="75"> -->
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:24px 24px 0 24px">
                                    <p>
                                        <a style="text-decoration:none;color:#1c1d1f">
                                            ${name}
                                        </a>
                                    </p>
                                    <p>
                                        <a style="text-decoration:none;color:#1c1d1f">
                                            ${requestTypeMessage}
                                        .</a>
                                    </p>
                                    <p>
                                        <a style="text-decoration:none;color:#1c1d1f">
                                            ${pleaseMessage}
                                        </a>
                                    </p>

                                    <p style="margin-bottom:0">
                                        <a style="text-decoration:none;color:#1c1d1f">
                                            ${infoMessage}
                                        </a>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:16px 24px 0 24px">
                                    <a href=${url}
                                        style="border:1px solid #cccccc;display:inline-block" target="_blank">
                                        <span
                                            style="background:#1c1d1f;color:#fff;display:inline-block;min-width:80px;border-top:14px solid #1c1d1f;border-bottom:14px solid #1c1d1f;border-left:12px solid #1c1d1f;border-right:12px solid #1c1d1f;text-align:center;text-decoration:none;white-space:nowrap;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;font-weight:700;line-height:1.2;letter-spacing:-0.2px">
                                           ${buttonText}
                                        </span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:48px 24px 0 24px">
                                    <p
                                        style="font-family:'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:12px;font-weight:400;line-height:1.4;color:#6a6f73;margin:0">
                                        ${academyMessage}
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td style="padding:24px 0 0 0"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td>&nbsp;</td>
            </tr>
        </tbody>
    </div>
    `
);