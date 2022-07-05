function createTemplate(videoTitle, videoDescription, videoViewCount, videoAuthor, authorLink, videoUploadDate) {
    var template = `<table id="mount" cellspacing="0" cellpadding="0" border="0" align="center">
    <tbody>
        <tr>
            <td>
                <div class="tableSubTitle">${videoTitle}</div>
                <div class="watchDescription">
                ${videoDescription}
                <div class="watchAdded" style="margin-top: 5px;"></div>
                </div>
                <div class="watchTags">Tags //
                    <a href="results?search=tobeadded">TBA soon...</a>
                    :
                </div>

                <div class="watchAdded">
                    Added:
                    ${videoUploadDate}
                    by
                    <a href="/channel/${authorLink}">${videoAuthor}</a>
                    //
                    <a href="/channel/${authorLink}">Videos</a>
                    (0) |
                    <a href="/channel/${authorLink}">Favorites</a>
                    (0) |
                    <a href="/channel/${authorLink}">Friends</a>
                    (0)
                </div>

                <div class="watchDetails">
                    Views:
                    ${videoViewCount}
                    |
                    <a href="#comment">Comments</a>: 1
                </div>

            </td>
        </tr>
    </tbody>
</table>
<style>
    /* Watch Elements */

    .watchTitleBar {
        background-color: #CCCCCC;
        border-bottom: 1px dashed #999999;
    }

    .watchTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        font-weight: bold;
        margin-left: 5px;
        margin-bottom: 6px;
        color: #333333;
    }

    .watchTable {
        background-color: #DDDDDD;
        background-image: url(img/table_results_bg.gif);
        background-repeat: repeat-x;
        background-position: left top;
        border-bottom: 1px dashed #999999;
        padding: 5px;
        padding-bottom: 10px;
        text-align: center;
    }

    #flashcontent {
        background-color: #FFFFFF;
        width: 425px;
        height: 350px;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid #CCC;
    }

    .watchInfoArea {
        width: 395px;
        text-align: left;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 15px;
        background-color: #FFFFFF;
    }

    .watchDescription {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        padding-bottom: 5px;
        color: #000;
        border-bottom: 1px dashed #CCC;
        /* fix for line breaks in youtubei response */
        white-space: pre-line;
    }

    .watchTags {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        margin: 5px 0px 10px 0px;
        color: #333333;
    }

    .watchAdded {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        margin-bottom: 5px;
        color: #333333;
    }

    .watchDetails {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-weight: normal;
        color: #333333;

    }

    .tableSubTitle {
        padding: 0px 0px 5px 0px;
        border-bottom: 1px dashed #CCC;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: bold;
        color: #CC6633;
    }

    .tableSubTitleInfo {
        font-size: 12px;
        padding: 3px;
        padding-left: 10px;
    }

    /* additional polymer stuff... */
    #mount {
        padding-top: 20px;
    }
</style>`;

    return template;
}
