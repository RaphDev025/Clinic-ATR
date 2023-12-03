export const handleActiveItem = (item, setItem) => {
    setItem(item)
}

export const iconPath = (item, navItem, fillIcon, outlineIcon) => {
    return item === navItem ? fillIcon : outlineIcon
}