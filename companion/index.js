import { me } from "companion";
import * as messaging from "messaging";
import { settingsStorage } from "settings";

const KEY_BACKGROUND_COLOR = "backgroundColor";
const KEY_INACTIVE_GRID_COLOR = "inactiveGridColor";
const KEY_GRID_COLOR = "gridColor";

settingsStorage.onchange = function(evt) {
  handleSettingsUpdate(evt.key, evt.newValue);
}

if (me.launchReasons.settingsChanged) {
  handleSettingsUpdate(KEY_BACKGROUND_COLOR, settingsStorage.getItem(KEY_BACKGROUND_COLOR));
  handleSettingsUpdate(KEY_INACTIVE_GRID_COLOR, settingsStorage.getItem(KEY_INACTIVE_GRID_COLOR));
  handleSettingsUpdate(KEY_GRID_COLOR, settingsStorage.getItem(KEY_GRID_COLOR));
}

function handleSettingsUpdate(key, value) {
  if (value) {
    sendSettingData({
      key: key,
      value: JSON.parse(value)
    })
  }
}

function sendSettingData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}