export const allowedColors = [
    '#000000', 
    '#0000aa', 
    '#00aa00', 
    '#00aaaa', 
    '#aa0000', 
    '#aa00aa', 
    '#aa5500', 
    '#aaaaaa', 
    '#555555', 
    '#5555ff', 
    '#55ff55', 
    '#55ffff', 
    '#ff5555', 
    '#ff55ff', 
    '#ffff55', 
    '#ffffff'
] as const;

const namesMap = ['black', 'blue', 'green', 'aqua', 'red', 'purple', 'yellow', 'white', 'gray', 'lightblue', 'lightgreen', 'lightaqua', 'lightred', 'lightpurple', 'lightyellow', 'brightwhite'] as const;

export type ColorsName = typeof namesMap[number];
export type AllowedColors = typeof allowedColors[number];

const ColorException = (type: 'name' | 'color', value: string) => {
    switch (type) {
        case 'name': return `Invalid Color Name Exception: provided color name ${value} is not a valid name\n\r\n\r
        Valid names are: ${namesMap.join(', ')}`;
        case 'color': return `Invalid Color Exception: provided color is not valid \n\r\n\r
        Valid color are: ${allowedColors.join(', ')}`;
    }
}

const getColorByHex = (color: string): AllowedColors => {
    return allowedColors[parseInt(color, 16)];
}

const getColorByName = (color: ColorsName): AllowedColors => {
    const index = namesMap.indexOf(color);
    if (index===-1) {
        throw ColorException('name', color);
    }
    return allowedColors[index];
}

const getHexByColor = (color: AllowedColors) => {
    const index = allowedColors.indexOf(color);
    if (index===-1) {
        throw ColorException('color', color);
    }
    return index.toString(16)
}

const colorsHelper = {
    getHexByColor,
    getColorByName,
    getColorByHex,
    allowedColors
}

export default colorsHelper