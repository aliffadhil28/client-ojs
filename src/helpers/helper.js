import $ from 'jquery'

export const levelHelper = (int) => {
    var color, level;
    switch (int) {
      case 1:
        color = "green";
        level = "Easy";
        break;
      case 2:
        color = "orange";
        level = "Medium";
        break;
      case 3:
        color = "red";
        level = "Hard";
        break;
      default:
        color = "black";
        level = "Undefined";
    }
    return `<div class="text-md font-semibold text-${color}-600">${level}</div>`
  };
  
export const handleContextmenu = e => {
  return e.preventDefault()
}

export const toggleVisible = (toHide,toShow) => {
  $(toShow).addClass('visible')
  $(toHide).addClass('invisible')
}

export const parseElement = (element) => {
  try {
    // Replace 'True' and 'False' with 'true' and 'false'
    const correctedElement = element.replace(/True/g, 'true').replace(/False/g, 'false');
    // Try to parse the element as JSON
    return JSON.parse(correctedElement);
  } catch (error) {
    // If parsing fails, return the original element
    return element;
  }
};
