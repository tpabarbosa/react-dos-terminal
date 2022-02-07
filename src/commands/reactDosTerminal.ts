
import { Command } from "../contexts/CommandContext";
import commandsHelper from "../helpers/commands";

const run = (): Command  => {
    return {
        output: [
            {action: 'add', value: help}
        ]
    }
}
    
const help =  [
    '____ ____ ____ ____ ___',          
    '|__/ |___ |__| |     | ' ,         
    '|  \\ |___ |  | |___  | '  ,        
    ''        ,
    '      ___  ____ ____ '            ,
    '   __ |  \\ |  | [__  __    '      ,
    '      |__/ |__| ___]     '        ,
    '      ',
    '___ ____ ____ _  _ _ _  _ ____ _    ',
    ' |  |___ |__/ |\\/| | |\\ | |__| |    ',
    ' |  |___ |  \\ |  | | | \\| |  | |___ ',
        ''                                ,
    '',
    `This project was made by ${commandsHelper.link("https://tpabarbosa.github.io/#/contact", 'Tatiana Barbosa')} with create-react-app and typescript. It's a simple component to mimic the behavior of a DOS command line interface.`,
    '',
    '',
    `By now only a few commands are available, but much more can be done to improve it. See ${commandsHelper.link("https://github.com/tpabarbosa", 'documentation')} to get more information.`,
    '',
    '', 
    `Thanks to "VileR" from ${commandsHelper.link("https://int10h.org/oldschool-pc-fonts", 'THE OLDSCHOOL PC FONT RESOURCE')} for adapting and providing various oldschool fonts. WebPlus_IBM_VGA_9x16.woff was the chosen font for this project.`, 
    '', 
]
    

export const reactDosTerminal = {run, help}