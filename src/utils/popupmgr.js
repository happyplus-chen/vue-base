const PopupManager = {
  zIndex: 2000,
  nextZIndex: function() {
    return PopupManager.zIndex++
  }
}

export default PopupManager
