
import { Command, CommandProps } from "../contexts/CommandContext";
import fakeFileSystemHelper from "../helpers/filesystem";

const run = ({args, actualDir, files}: CommandProps): Command => {

    if (!args) {
        return { 
            output: [{action: 'add', value: [
                `Error: TYPE command requires an argument.`,
                '',
                ...help
            ]}]
        };
    }

    const content = fakeFileSystemHelper.getDir(files, actualDir);
    const file = content?.files[args] ? content?.files[args] : false;

    if (!file) {
        return { output: [{action: 'add', value: [
            `File ${args} doesn't exists.`,
            '',
            ]}]}
    }

    if (file.t!=='f') {
        return { output: [{action: 'add', value: [
            '',
            `MZÉ♥♦  ©@Ó♫▼║♫┤ ═!©☺L═!.`,
            `$♣·∟AørÝAørÝAørÝU­wý@ørÝU­qýCørÝU­výPørÝAøsÝbørÝU­sýFørÝU­zýCørÝU­ìÝ@ørÝU­pý@ørÝRichAørÝPEdå♠MÝ(­"♂☻♫¶$0¶►@☺►☻`,
            '',
            '',
            `@╠' └"T► ↑☺(!►☺.textÓ   ►`,
            `♦ '.rdata╠`,
            `♫@@.datax♠0☻↑@└.pdata╠@☻,`,
            '',
            '',
            ]}]
        }
    }

    if (typeof file.c === 'string') {
        return { output: [{action: 'add', value: [ '', file.c, '' ] } ]}
    } 

    const cont = file.c as string[]
    return { output: [{action: 'add', value: [ '', ...cont, '' ] } ]}
    
}

const help = [
    'The TYPE command displays the contents of a text file. However, it does not allow you to edit the file, or add new text.',
    '',
    'The TYPE command has no options.',
    '',
    'TYPE [filename]',
    '',
    'Filename is the name of the file to show.',
    ''
];


export const type = {run, help}
