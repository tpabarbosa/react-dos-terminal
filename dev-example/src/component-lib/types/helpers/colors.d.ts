export declare const allowedColors: readonly ["#000000", "#0000aa", "#00aa00", "#00aaaa", "#aa0000", "#aa00aa", "#aa5500", "#aaaaaa", "#555555", "#5555ff", "#55ff55", "#55ffff", "#ff5555", "#ff55ff", "#ffff55", "#ffffff"];
declare const namesMap: readonly ["black", "blue", "green", "aqua", "red", "purple", "yellow", "white", "gray", "lightblue", "lightgreen", "lightaqua", "lightred", "lightpurple", "lightyellow", "brightwhite"];
export declare type ColorsName = typeof namesMap[number];
export declare type AllowedColors = typeof allowedColors[number];
declare const colorsHelper: {
    getHexByColor: (color: AllowedColors) => string;
    getColorByName: (color: ColorsName) => AllowedColors;
    getColorByHex: (color: string) => AllowedColors;
    allowedColors: readonly ["#000000", "#0000aa", "#00aa00", "#00aaaa", "#aa0000", "#aa00aa", "#aa5500", "#aaaaaa", "#555555", "#5555ff", "#55ff55", "#55ffff", "#ff5555", "#ff55ff", "#ffff55", "#ffffff"];
};
export default colorsHelper;
