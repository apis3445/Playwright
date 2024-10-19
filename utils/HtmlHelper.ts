import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';

export class HtmlHelper {

    /**
     * Replace the html template tags with an object
     * @param templateFile Html template file
     * @param objectToReplace Object with data to replace
     * @param folderTest Folder to store the report
     * @param fileName File name to store the report
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async replaceTags(templateFile: string, objectToReplace: any, folderTest: string, fileName: string) {
        const templatePath = path.join(__dirname, 'reporter', 'templates', templateFile);
        const template = fs.readFileSync(templatePath, 'utf8');
        const htmlContent = mustache.render(template, objectToReplace);
        if (!fs.existsSync(folderTest)) {
            fs.mkdirSync(folderTest, { recursive: true });
        }
        fs.writeFileSync(fileName, htmlContent);
    }

    /**
     * Replace HTML template tags with data from an object and store the resulting content in a file
     * @param templateFile Path to the HTML template file
     * @param objectToReplace Object containing data to replace in the template
     * @param folderTest Folder path to store the generated report
     * @param fileName Name of the file to store the report
     */
    ansiToHtml(text: string): string {
        const ansiToHtmlMap: Record<string, string> = {
            '\u001b[30m': '<span class="black">',
            '\u001b[31m': '<span class="red">',
            '\u001b[32m': '<span class="green">',
            '\u001b[33m': '<span class="yellow">',
            '\u001b[34m': '<span class="blue">',
            '\u001b[35m': '<span class="magenta">',
            '\u001b[36m': '<span class="cyan">',
            '\u001b[37m': '<span class="white">',
            '\u001b[0m': '</span>', // Reset
            '\u001b[2m': '<span class="dim">', // Dim
            '\u001b[22m': '</span>', // Reset dim
            '\u001b[39m': '</span>', // Reset color
        };

        let htmlText = text;
        const openTags: string[] = [];

        for (const [ansiCode, htmlTag] of Object.entries(ansiToHtmlMap)) {
            if (htmlTag.startsWith('<span')) {
                openTags.push(htmlTag);
            } else if (htmlTag === '</span>') {
                if (openTags.length > 0) {
                    openTags.pop();
                } else {
                    // If there is no matching opening tag, skip this closing tag
                    continue;
                }
            }
            htmlText = htmlText.split(ansiCode).join(htmlTag);
        }

        // Close any remaining open tags
        while (openTags.length > 0) {
            htmlText += '</span>';
            openTags.pop();
        }
        return htmlText;
    }
}