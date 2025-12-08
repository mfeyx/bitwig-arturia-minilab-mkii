// Controller Script for the Arturia MiniLab
loadAPI(1);

load("Extensions.js");

// Controller Script for the Arturia MiniLab mk II
host.defineController(
  "mfeyx",
  "MiniLab Mk II",
  "1",
  "b90f7e7c-b0eb-46a5-9696-57a26b267b73",
  "Markus Feiks"
);
host.addDeviceNameBasedDiscoveryPair(
  ["Arturia MiniLab mkII"],
  ["Arturia MiniLab mkII"]
);
host.defineMidiPorts(1, 1);
host.defineSysexIdentityReply(
  "F0 7E ?? 06 02 00 20 6B 02 00 04 0? ?? ?? ?? ?? F7"
);

/* ----------------------- top row ---------------------- */
var KNOBS_TOP = [112, 74, 71, 76, 77, 93, 73, 75];
/* --------------------- bottom row --------------------- */
var KNOBS_LOW = [114, 18, 19, 16, 17, 91, 79, 72];
/* ---------------------- pads 9-16 --------------------- */
var PADS = [22, 23, 24, 25, 26, 27, 28, 29];

var ARTURIA_MODE = PADS[0];


/* ------------------ BITWIG CONTROLLS ------------------ */
// TODO: Mode Selector,
// Use One Button to switch between Mixer and Device Mode
var MIXER_MODE = PADS[2];
var DEVICE_MODE = PADS[3];

// Sub Modes
var SELECT_L = PADS[4];
var SELECT_R = PADS[5];

// Navigate
var SCROLL_L = PADS[6];
var SCROLL_R = PADS[7];

/* ------------------------ Other ----------------------- */
var Mode = "Track";
var SubMode = "VolPan";
var tName = "None";
var tNameHasChanged = false;
var dName = "None";
var dNameHasChanged = false;
var pName = "None";
var presetHasChanged = false;
var pageNames = [];
var pageNumber = 0;
var pageHasChanged = false;
var padShift = 0;
var padshiftHasChanged = true;
var padTranslation = initArray(0, 128);

/* ------------------------------------------------------ */
/*                      ARTURIA MODE                      */
/* ------------------------------------------------------ */

/* ----------------- ADD DEFAULT VALUES ----------------- */
var KNOB_CACHE = {};
var DEFAULT_VAL = 24;
for (var i = 0; i < 8; i++) {
  KNOB_CACHE[KNOBS_LOW[i]] = DEFAULT_VAL;
  KNOB_CACHE[KNOBS_TOP[i]] = DEFAULT_VAL;
}
// main volume
KNOB_CACHE[75] = 110

/* ------------------------------------------------------ */
/*                     HELPER FUNCTIONS                   */
/* ------------------------------------------------------ */
function onSysex(data) {
  printSysex(data);
  println(data);
}

function pollState() {
  sendSysex("F0 00 20 6B 7F 42 01 00 00 2F F7");
}

function setIndications() {
  var track = false;
  var send = false;
  var device = false;
  var preset = false;
  var arturia = false;

  switch (Mode) {
    case "Track":
      if (SubMode === "VolPan") {
        track = true;
      } else {
        send = true;
      }
      break;
    case "Device":
      device = true;
      break;
    // case "Preset":
    //   preset = true;
    //   break;
    case "Arturia":
      arturia = true;
      break;
  }
  for (var i = 0; i < 8; i++) {
    tracks.getTrack(i).getVolume().setIndication(track);
    tracks.getTrack(i).getPan().setIndication(track);
    tracks.getTrack(i).getSend(0).setIndication(send);
    tracks.getTrack(i).getSend(1).setIndication(send);
    cDevice.getMacro(i).getAmount().setIndication(device);
    cDevice.getCommonParameter(i).setIndication(device);
    cDevice.getEnvelopeParameter(i).setIndication(preset);
    cDevice.getParameter(i).setIndication(preset);
    uControl.getControl(i).setIndication(arturia);
    uControl.getControl(i + 8).setIndication(arturia);
  }
}

function knobFunc(Row, index, midi) {
  var inc = (midi.data2 - 64) * 0.1;
  switch (Mode) {
    case "Track":
      if (SubMode === "VolPan") {
        if (Row === 1) {
          tracks.getTrack(index).getVolume().inc(inc, 256);
        } else {
          tracks.getTrack(index).getPan().inc(inc, 128);
        }
      }
      // SubMode = "Sends"
      else {
        if (Row === 1) {
          tracks.getTrack(index).getSend(1).inc(inc, 128);
        } else {
          tracks.getTrack(index).getSend(0).inc(inc, 128);
        }
      }
      break;
    case "Device":
      if (Row === 1) {
        cDevice.getMacro(index).getAmount().inc(inc, 128);
      } else {
        cDevice.getCommonParameter(index).inc(inc, 128);
      }
      break;
    case "Arturia":
      // -1, 0, 1
      var inc = midi.data2 - 64;
      var lastVal = KNOB_CACHE[midi.data1];
      var newVal = lastVal + inc;
      newVal = newVal > 127 ? 127 : newVal;
      newVal = newVal < 0 ? 0 : newVal;
      KNOB_CACHE[midi.data1] = newVal;
      println(`${midi.status}, ${midi.data1}, ${midi.data2}, inc: ${inc}`);
      MiniLabKeys.sendRawMidiEvent(midi.status, midi.data1, newVal);
      break;
  }
}

/* ------------------------------------------------------ */
/*                    DEVICE INIT FUNC                    */
/* ------------------------------------------------------ */
function init() {
  // Create the Note Inputs and their Settings
  MiniLabKeys = host
    .getMidiInPort(0)
    .createNoteInput(
      "MiniLab Keys",
      "80????",
      "90????",
      "B001??",
      "B002??",
      "B007??",
      "B00B??",
      "B040??",
      "C0????",
      "D0????",
      "E0????"
    );
  MiniLabKeys.setShouldConsumeEvents(false);
  MiniLabPads = host.getMidiInPort(0).createNoteInput("MiniLab Pads", "?9????");
  MiniLabPads.setShouldConsumeEvents(false);
  MiniLabPads.assignPolyphonicAftertouchToExpression(
    0,
    NoteExpression.TIMBRE_UP,
    2
  );

  // Setting Callbacks for Midi and Sysex
  host.getMidiInPort(0).setMidiCallback(onMidi);
  host.getMidiInPort(0).setSysexCallback(onSysex);

  setNoteTable(MiniLabPads, padTranslation, padShift);

  // Creating the main objects:
  transport = host.createTransport();
  tracks = host.createTrackBank(8, 2, 0);
  cTrack = host.createCursorTrack(3, 0);
  cDevice = cTrack.getPrimaryDevice();
  uControl = host.createUserControls(16);

  setIndications("track");

  for (var i = 0; i < 8; i++) {
    uControl.getControl(i).setLabel("CC " + KNOBS_LOW[i]);
    uControl.getControl(i + 8).setLabel("CC " + KNOBS_TOP[i]);
  }

  cTrack.addNameObserver(50, "None", function (name) {
    tName = name;
    if (tNameHasChanged) {
      host.showPopupNotification("Track: " + name);
      tNameHasChanged = false;
    }
  });

  cDevice.addNameObserver(50, "None", function (name) {
    dName = name;
    if (dNameHasChanged) {
      host.showPopupNotification("Device: " + name);
      dNameHasChanged = false;
    }
  });

  cDevice.addPresetNameObserver(50, "None", function (name) {
    pName = name;
    if (presetHasChanged) {
      host.showPopupNotification("Preset: " + name);
      presetHasChanged = false;
    }
  });

  cDevice.addPageNamesObserver(function (names) {
    pageNames = [];
    for (var j = 0; j < names.length; j++) {
      pageNames[j] = names[j];
    }
  });

  cDevice.addSelectedPageObserver(-1, function (val) {
    pageNumber = val;
    if (pageHasChanged) {
      host.showPopupNotification(
        "Parameter Page " + (val + 1) + ": " + pageNames[val]
      );
      pageHasChanged = false;
    }
  });

  try {
    host.getNotificationSettings().setShouldShowSelectionNotifications(true);
    host
      .getNotificationSettings()
      .setShouldShowChannelSelectionNotifications(true);
    host
      .getNotificationSettings()
      .setShouldShowTrackSelectionNotifications(true);
    host
      .getNotificationSettings()
      .setShouldShowDeviceSelectionNotifications(true);
    host
      .getNotificationSettings()
      .setShouldShowDeviceLayerSelectionNotifications(true);
    host.getNotificationSettings().setShouldShowPresetNotifications(true);
    host.getNotificationSettings().setShouldShowMappingNotifications(true);
    host.getNotificationSettings().setShouldShowValueNotifications(true);
  } catch (e) {}

  host.scheduleTask(pollState, null, 500);
}

/* ------------------------------------------------------ */
/*                 ON MIDI EVENT CALLBACK                 */
/* ------------------------------------------------------ */
function onMidi(status, data1, data2) {
  // Instantiate the MidiData Object for convenience:
  var midi = new MidiData(status, data1, data2);

  // debugging
  // println(midi.status, midi.data1, midi.data2);

  var noteOn = midi.isOn();
  var isCCMessage = midi.isChannelController();
  var controlMessage = midi.data1

  if (isCCMessage) {
    switch (controlMessage) {
      // used for Analog Lab Controlls
      case ARTURIA_MODE:
        if (noteOn) {
          Mode = "Arturia";
          host.showPopupNotification(Mode + " Mode");
        } else {
          setIndications("arturia");
        }
        break;

      // Mixer: controll Volume, Pan, or Sends
      case MIXER_MODE:
        if (noteOn) {
          Mode = "Track";
          host.showPopupNotification("Mix Mode");
        } else {
          setIndications("track");
        }
        break;

      // Devices: Switch between Devices, or select device pages
      case DEVICE_MODE:
        if (noteOn) {
          Mode = "Device";
          host.showPopupNotification("Device Mode");
        } else {
          setIndications("device");
        }
        break;

      case SELECT_L:
        switch (Mode) {
          case "Track":
            if (noteOn) {
              SubMode = "VolPan";
              host.showPopupNotification("Volume & Pan");
            } else {
              setIndications("track");
            }
            break;
          case "Device":
            if (noteOn) {
              dNameHasChanged = true;
              cDevice.switchToDevice(DeviceType.ANY, ChainLocation.PREVIOUS);
            }
            break;
          case "Preset":
            break;
          case "Arturia":
            break;
        }
        break;

      case SELECT_R:
        switch (Mode) {
          case "Track":
            if (midi.isOn()) {
              SubMode = "Send";
              host.showPopupNotification("Sends");
            } else {
              setIndications("send");
            }
            break;
          case "Device":
            if (noteOn) {
              dNameHasChanged = true;
              cDevice.switchToDevice(DeviceType.ANY, ChainLocation.NEXT);
            }
            break;
          case "Preset":
            break;
        }
        break;

      // this is use to scroll left
      case SCROLL_L:
        switch (Mode) {
          case "Track":
            if (midi.isOn()) {
              host.showPopupNotification("Scroll Bank Up");
              tracks.scrollChannelsPageUp();
            }
            break;
          case "Device":
            if (noteOn) {
              pageHasChanged = true;
              cDevice.previousParameterPage();
            }
            break;
          case "Preset":
            break;
          case "Arturia":
            break;
        }
        break;

      // this is used to scroll right
      case SCROLL_R:
        switch (Mode) {
          case "Track":
            if (noteOn) {
              host.showPopupNotification("Scroll Bank Down");
              tracks.scrollChannelsPageDown();
            }
            break;
          case "Device":
            if (noteOn) {
              pageHasChanged = true;
              cDevice.nextParameterPage();
            }
            break;
          case "Preset":
            break;
          case "Arturia":
            break;
        }
        break;

      default:
        for (var i = 0; i < 8; i++) {
          if (midi.data1 === KNOBS_LOW[i]) {
            knobFunc(1, i, midi);
          } else if (midi.data1 === KNOBS_TOP[i]) {
            knobFunc(2, i, midi);
          }
        }
    }
  }
}

function exit() {}
