/**
 * Bitwig Studio Controller API Type Definitions
 *
 * This file provides TypeScript type definitions for the Bitwig Studio Controller API.
 * Generated from official Bitwig Studio documentation.
 *
 * Usage:
 * At the top of your controller script (.control.js), add:
 * /// <reference path="./api-docs/bitwig-controller-api.d.ts" />
 *
 * Global variables like 'host' and 'transport' are automatically available
 * from Bitwig Studio's runtime environment.
 *
 * Or if using module imports:
 * import type * as Bitwig from './api-docs/bitwig-controller-api.d.ts';
 */

// Note: These globals are provided by Bitwig Studio at runtime:
// - loadAPI(version: number): void
// - println(message: string): void
// - errorln(message: string): void
// - host: ControllerHost
// - transport: Transport (when created)
// - init(): void
// - flush(): void
// - exit(): void

// ===========================================================================================
// CORE INTERFACES
// ===========================================================================================

/**
 * The Host interface provides access to general application functionality and system information.
 * This is the base interface for all host interactions in Bitwig Studio extensions.
 */
export interface Host {
  /**
   * Returns the latest supported API version of the host application.
   * @returns The API version number supported by this host
   * @since API version 1
   */
  getHostApiVersion(): number;

  /**
   * Returns the vendor name of the host application.
   * @returns The vendor string (typically "Bitwig")
   * @since API version 1
   */
  getHostVendor(): string;

  /**
   * Returns the product name of the host application.
   * @returns The product name (typically "Bitwig Studio")
   * @since API version 1
   */
  getHostProduct(): string;

  /**
   * Returns the version number of the host application.
   * @returns The version string of the host application
   * @since API version 1
   */
  getHostVersion(): string;

  /**
   * Returns the platform type that this host is running on.
   * @returns The platform type (Windows, Mac, or Linux)
   * @since API version 1
   */
  getPlatformType(): PlatformType;

  /**
   * Sets an email address to use for reporting errors found in this script.
   * @param address The email address for error reporting
   * @since API version 1
   */
  setErrorReportingEMail(address: string): void;

  /**
   * Gets the OpenSoundControl module for OSC communication.
   * @returns The OSC module instance
   * @since API version 1
   */
  getOscModule(): OscModule;

  /**
   * Allocates memory that will be automatically freed once the extension exits.
   * @param size The size of memory to allocate in bytes
   * @returns The allocated memory block
   * @since API version 1
   */
  allocateMemoryBlock(size: number): MemoryBlock;

  /**
   * Creates an offscreen bitmap that the extension can use to render into.
   * @param width The width of the bitmap in pixels
   * @param height The height of the bitmap in pixels
   * @param format The bitmap format to use
   * @returns The created bitmap
   * @since API version 1
   */
  createBitmap(width: number, height: number, format: BitmapFormat): Bitmap;

  /**
   * Creates a new FontOptions object for text rendering.
   * @returns A new FontOptions instance
   * @since API version 1
   */
  createFontOptions(): FontOptions;

  /**
   * Loads a font from the specified file path.
   * @param path The path to the font file
   * @returns The loaded font face
   * @since API version 1
   */
  loadFontFace(path: string): FontFace;

  /**
   * Loads a PNG image from the specified file path.
   * @param path The path to the PNG file
   * @returns The loaded image
   * @since API version 1
   */
  loadPNG(path: string): Image;

  /**
   * Loads an SVG image from the specified file path with scaling.
   * @param path The path to the SVG file
   * @param scale The scale factor to apply to the SVG
   * @returns The loaded and scaled image
   * @since API version 1
   */
  loadSVG(path: string, scale: number): Image;
}

/**
 * The ControllerHost interface extends Host and provides controller-specific functionality.
 * This is the main interface for interacting with Bitwig Studio from controller scripts.
 */
export interface ControllerHost extends Host {
  // Controller Definition Methods

  /**
   * Registers the controller script in Bitwig Studio with identification information.
   * This method must be called on the global scope of the script.
   * @param vendor The vendor name of the controller (e.g., "Akai")
   * @param name The name of the controller (e.g., "MIDIMix")
   * @param version The version of the controller script
   * @param uuid A unique identifier for this controller script (generate once and keep)
   * @param author Optional author name for the controller script
   * @since API version 1
   */
  defineController(vendor: string, name: string, version: string, uuid: string, author?: string): void;

  /**
   * Defines the number of MIDI input and output ports that the controller uses.
   * This method must be called on the global scope of the script.
   * @param numInputs The number of MIDI input ports (0-16)
   * @param numOutputs The number of MIDI output ports (0-16)
   * @since API version 1
   */
  defineMidiPorts(numInputs: number, numOutputs: number): void;

  /**
   * Defines a sysex identity reply pattern for device detection.
   * @param reply The sysex identity reply pattern as hex string
   * @since API version 1
   */
  defineSysexIdentityReply(reply: string): void;

  /**
   * Registers device name patterns for automatic hardware detection.
   * When the user clicks detect, Bitwig searches for devices matching these patterns.
   * @param inputs Array of input port name patterns to match
   * @param outputs Array of output port name patterns to match
   * @since API version 1
   */
  addDeviceNameBasedDiscoveryPair(inputs: string[], outputs: string[]): void;

  /**
   * Defines sysex patterns for device discovery via MIDI identity request.
   * @param request The sysex request pattern to send
   * @param reply The expected sysex reply pattern
   * @since API version 1
   */
  defineSysexDiscovery(request: string, reply: string): void;

  // Platform Detection

  /**
   * Checks if the host is running on Windows platform.
   * @returns True if running on Windows, false otherwise
   * @since API version 1
   */
  platformIsWindows(): boolean;

  /**
   * Checks if the host is running on Mac platform.
   * @returns True if running on Mac, false otherwise
   * @since API version 1
   */
  platformIsMac(): boolean;

  /**
   * Checks if the host is running on Linux platform.
   * @returns True if running on Linux, false otherwise
   * @since API version 1
   */
  platformIsLinux(): boolean;

  // MIDI Ports
  getMidiInPort(index: number): MidiIn;
  getMidiOutPort(index: number): MidiOut;

  // Hardware
  hardwareDevice(index: number): HardwareDevice;
  createHardwareSurface(): HardwareSurface;

  // System
  restart(): void;
  loadAPI(version: number): void;
  useBetaApi(): void;
  shouldFailOnDeprecatedUse(): boolean;
  setShouldFailOnDeprecatedUse(should: boolean): void;
  load(path: string): void;

  // Preferences & State
  getPreferences(): Preferences;
  getDocumentState(): DocumentState;
  getNotificationSettings(): NotificationSettings;

  // Project & Transport
  getProject(): Project;
  createTransport(): Transport;
  createGroove(): Groove;

  // Application
  createApplication(): Application;

  // Views
  createArranger(window?: number): Arranger;
  createMixer(window?: number, perspective?: string): Mixer;
  createDetailEditor(window?: number): DetailEditor;

  // Browser
  createPopupBrowser(): PopupBrowser;

  // Track & Device Banks
  createTrackBank(numTracks: number, numSends: number, numScenes: number, followSelection?: boolean): TrackBank;
  createMainTrackBank(numTracks: number, numSends: number, numScenes: number): TrackBank;
  createEffectTrackBank(numTracks: number, numSends: number, numScenes?: number): EffectTrackBank;
  createMasterTrack(numScenes: number): MasterTrack;
  createArrangerCursorTrack(numSends: number, numScenes: number): CursorTrack;
  createCursorTrack(name: string, numSends: number, numScenes: number): CursorTrack;
  createCursorTrack(name: string, id: string, numSends: number, numScenes: number, shouldFollowSelection: boolean): CursorTrack;
  createSceneBank(numScenes: number): SceneBank;

  // Devices
  createEditorCursorDevice(numParams?: number): CursorDevice;

  // Clips
  createCursorClip(gridWidth: number, gridHeight: number): CursorClip;
  createLauncherCursorClip(gridWidth: number, gridHeight: number): CursorClip;
  createArrangerCursorClip(gridWidth: number, gridHeight: number): CursorClip;

  // User Controls
  createUserControls(numControls: number): UserControlBank;
  createLastClickedParameter(name: string, id: string): Parameter;

  // Scheduling & Utilities
  scheduleTask(task: () => void, delay: number): void;
  scheduleTask(target: object, args: any[], delay: number): void;
  requestFlush(): void;

  // Logging & Notifications
  println(message: string): void;
  errorln(message: string): void;
  showPopupNotification(message: string): void;

  // Network
  createRemoteConnection(host: string, port: number): RemoteConnection;
  connectToRemoteHost(host: string, port: number, callback: ConnectionEstablishedCallback): void;
  sendDatagramPacket(host: string, port: number, data: number[]): void;
  addDatagramPacketObserver(name: string, port: number, callback: DataReceivedCallback): boolean;

  // Hardware Actions & Matchers
  createOrHardwareActionMatcher(matcher1: HardwareActionMatcher, matcher2: HardwareActionMatcher): HardwareActionMatcher;
  createOrRelativeHardwareValueMatcher(matcher1: RelativeHardwareValueMatcher, matcher2: RelativeHardwareValueMatcher): RelativeHardwareValueMatcher;
  createOrAbsoluteHardwareValueMatcher(matcher1: AbsoluteHardwareValueMatcher, matcher2: AbsoluteHardwareValueMatcher): AbsoluteHardwareValueMatcher;

  // MIDI Expressions
  midiExpressions(): MidiExpressions;

  // Actions & Bindings
  createAction(runnable: () => void, descriptionProvider: () => string): HardwareActionBindable;
  createAction(actionPressureConsumer: (pressure: number) => void, descriptionProvider: () => string): HardwareActionBindable;
  createCallbackAction(runnable: () => void, descriptionProvider: () => string): HardwareActionBindable;
  createPressureCallbackAction(pressureConsumer: (pressure: number) => void, descriptionProvider: () => string): HardwareActionBindable;

  // Hardware Control Targets
  createRelativeHardwareControlStepTarget(increaseAction: HardwareActionBindable, decreaseAction: HardwareActionBindable): RelativeHardwarControlBindable;
  createRelativeHardwareControlAdjustmentTarget(adjustmentConsumer: (amount: number) => void): RelativeHardwarControlBindable;
  createAbsoluteHardwareControlAdjustmentTarget(adjustmentConsumer: (value: number) => void): AbsoluteHardwarControlBindable;

  // Object Management
  deleteObjects(confirmation: string, ...objects: DeleteableObject[]): void;
  deleteObjects(...objects: DeleteableObject[]): void;
  duplicateObjects(confirmation: string, ...objects: DuplicableObject[]): void;
  duplicateObjects(...objects: DuplicableObject[]): void;

  // Device Matchers
  createInstrumentMatcher(): DeviceMatcher;
  createAudioEffectMatcher(): DeviceMatcher;
  createNoteEffectMatcher(): DeviceMatcher;
  createBitwigDeviceMatcher(uuid: string): DeviceMatcher;
  createVST2DeviceMatcher(id: number): DeviceMatcher;
  createVST3DeviceMatcher(uid: string): DeviceMatcher;
  createActiveDeviceMatcher(): DeviceMatcher;
  createFirstDeviceInChainMatcher(): DeviceMatcher;
  createLastDeviceInChainMatcher(): DeviceMatcher;
  createOrDeviceMatcher(...matchers: DeviceMatcher[]): DeviceMatcher;
  createAndDeviceMatcher(...matchers: DeviceMatcher[]): DeviceMatcher;
  createNotDeviceMatcher(matcher: DeviceMatcher): DeviceMatcher;

  // Recording
  createMasterRecorder(): MasterRecorder;

  // Audio Hardware
  createAudioIoDeviceHardwareAddressMatcher(address: string): AudioIoDeviceMatcher;
  createUsbAudioIoDeviceMatcher(vendorId: number, productId: number): AudioIoDeviceMatcher;
  createAudioHardwareOutputInfo(deviceMatcher: AudioIoDeviceMatcher, channels: number[]): AudioHardwareOutputInfo;
  createAudioHardwareInputInfo(deviceMatcher: AudioIoDeviceMatcher, channels: number[]): AudioHardwareInputInfo;

  // Time Formatting
  defaultBeatTimeFormatter(): BeatTimeFormatter;
  setDefaultBeatTimeFormatter(formatter: BeatTimeFormatter): void;
  createBeatTimeFormatter(separator: string, barsLen: number, beatsLen: number, subdivisionLen: number, ticksLen: number): BeatTimeFormatter;

  // Deprecated methods (for backwards compatibility)
  /** @deprecated Use createTransport() instead */
  createTransportSection(): Transport;
  /** @deprecated Use createCursorTrack(int, int) instead */
  createCursorTrack(numSends: number, numScenes: number): CursorTrack;
  /** @deprecated Use createGroove() instead */
  createGrooveSection(): Groove;
  /** @deprecated Use createApplication() instead */
  createApplicationSection(): Application;
  /** @deprecated Use createArranger(int) instead */
  createArrangerSection(window: number): Arranger;
  /** @deprecated Use createMixer(String, int) instead */
  createMixerSection(perspective: string, window: number): Mixer;
  /** @deprecated Use createTrackBank(...) instead */
  createTrackBankSection(numTracks: number, numSends: number, numScenes: number): TrackBank;
  /** @deprecated Use createMainTrackBank(...) instead */
  createMainTrackBankSection(numTracks: number, numSends: number, numScenes: number): TrackBank;
  /** @deprecated Use createEffectTrackBank(...) instead */
  createEffectTrackBankSection(numTracks: number, numSends: number): EffectTrackBank;
  /** @deprecated Use createArrangerCursorTrack(...) instead */
  createCursorTrackSection(numSends: number, numScenes: number): CursorTrack;
  /** @deprecated Use createMasterTrack(...) instead */
  createMasterTrackSection(numScenes: number): MasterTrack;
  /** @deprecated Use createCursorClip(...) instead */
  createCursorClipSection(gridWidth: number, gridHeight: number): CursorClip;
  /** @deprecated Use createEditorCursorDevice(...) instead */
  createCursorDeviceSection(numParams: number): CursorDevice;
  /** @deprecated Use createEditorCursorDevice() instead */
  createCursorDevice(): CursorDevice;
  /** @deprecated Use createUserControls(...) instead */
  createUserControlsSection(numControls: number): UserControlBank;
  /** @deprecated Use defineController(String, String, String, String, String) instead */
  defineController(vendor: string, name: string, version: string, uuid: string): void;
}

// ===========================================================================================
// ENUMS & CONSTANTS
// ===========================================================================================

export enum PlatformType {
  WINDOWS = "WINDOWS",
  MAC = "MAC",
  LINUX = "LINUX"
}

// MMC (MIDI Machine Control) Transport Commands
export interface MMC_TRANSPORT {
  readonly REWIND: "f07f7f0605f7";
  readonly FAST_FORWARD: "f07f7f0604f7";
  readonly STOP: "f07f7f0601f7";
  readonly PLAY: "f07f7f0602f7";
  readonly RECORD: "f07f7f0606f7";
}
export const MMC_TRANSPORT: MMC_TRANSPORT;// Common MIDI Status Bytes
export interface MIDI_STATUS {
  readonly NOTE_OFF: 0x80;
  readonly NOTE_ON: 0x90;
  readonly POLY_AFTERTOUCH: 0xA0;
  readonly CONTROL_CHANGE: 0xB0;
  readonly PROGRAM_CHANGE: 0xC0;
  readonly CHANNEL_AFTERTOUCH: 0xD0;
  readonly PITCH_BEND: 0xE0;
  readonly SYSTEM_EXCLUSIVE: 0xF0;
}
export const MIDI_STATUS: MIDI_STATUS;

export enum BitmapFormat {
  ARGB32 = "ARGB32",
  BGR24 = "BGR24"
}

export enum HardwareControlType {
  SLIDER = "SLIDER",
  KNOB = "KNOB",
  ENCODER = "ENCODER",
  BUTTON = "BUTTON"
}

// ===========================================================================================
// MIDI & HARDWARE
// ===========================================================================================

/**
 * Represents a MIDI input port for receiving MIDI messages from hardware controllers.
 */
export interface MidiIn {
  /**
   * Sets a callback function for receiving short MIDI messages (note on/off, CC, etc.).
   * @param callback Function called with (status, data1, data2) when MIDI is received
   * - status: MIDI status byte (includes message type and channel)
   * - data1: First data byte (note number, CC number, etc.)
   * - data2: Second data byte (velocity, CC value, etc.)
   * @since API version 1
   */
  setMidiCallback(callback: (status: number, data1: number, data2: number) => void): void;

  /**
   * Sets a callback function for receiving system exclusive (sysex) messages.
   * @param callback Function called with hex string when sysex is received
   * @since API version 1
   */
  setSysexCallback(callback: (data: string) => void): void;

  /**
   * Creates a note input for routing MIDI notes to Bitwig's instrument tracks.
   * @param name Display name for this note input
   * @param mask Optional MIDI mask pattern (e.g., "?0????" for channel 1 notes only)
   * @returns The created note input
   * @since API version 1
   */
  createNoteInput(name: string, mask?: string): NoteInput;

  /**
   * Sets a translation table for incoming MIDI note numbers.
   * @param table Array mapping input notes to output notes (128 elements)
   * @since API version 1
   */
  setKeyTranslationTable(table: number[]): void;

  /**
   * Sets a translation table for incoming MIDI velocity values.
   * @param table Array mapping input velocities to output velocities (128 elements)
   * @since API version 1
   */
  setVelocityTranslationTable(table: number[]): void;
}

/**
 * Represents a MIDI output port for sending MIDI messages to hardware controllers.
 */
export interface MidiOut {
  /**
   * Sends a short MIDI message to the hardware controller.
   * @param status MIDI status byte (includes message type and channel)
   * @param data1 First data byte (note number, CC number, etc.)
   * @param data2 Second data byte (velocity, CC value, etc.)
   * @since API version 1
   * @example
   * // Send note on C3 with velocity 100 on channel 1
   * midiOut.sendMidi(0x90, 60, 100);
   * // Send CC 7 (volume) with value 127 on channel 1
   * midiOut.sendMidi(0xB0, 7, 127);
   */
  sendMidi(status: number, data1: number, data2: number): void;

  /**
   * Sends a system exclusive (sysex) message to the hardware controller.
   * @param data Hex string representation of the sysex data
   * @since API version 1
   * @example
   * // Send device inquiry sysex
   * midiOut.sendSysex("F0 7E 00 06 01 F7");
   */
  sendSysex(data: string): void;

  /**
   * Configures whether this MIDI output should send MIDI beat clock.
   * @param shouldSend True to send beat clock, false to disable
   * @since API version 1
   */
  setShouldSendMidiBeatClock(shouldSend: boolean): void;
}

export interface NoteInput {
  setShouldConsumeEvents(shouldConsume: boolean): void;
  setKeyTranslationTable(table: number[]): void;
  setVelocityTranslationTable(table: number[]): void;
  setChannel(channel: number): void;
  assignPolyphonicAftertouchToExpression(note: number, expression: number, range: number): void;
  sendRawMidiEvent(status: number, data1: number, data2: number): void;
}

export interface HardwareDevice {
  // Hardware device functionality
}

export interface HardwareSurface {
  createHardwareButton(id: string): HardwareButton;
  createHardwareSlider(id: string): HardwareSlider;
  createHardwareKnob(id: string): HardwareKnob;
  createAbsoluteHardwareKnob(id: string): AbsoluteHardwareKnob;
  createRelativeHardwareKnob(id: string): RelativeHardwareKnob;
  createHardwareLightOnOff(id: string): OnOffHardwareLight;
  createHardwareTextDisplay(id: string, numLines: number): HardwareTextDisplay;
  createMultiLineTextDisplay(id: string, numLines: number, numCells: number): MultiLineHardwareTextDisplay;
  setPhysicalSize(widthInMM: number, heightInMM: number): void;
  createPianoKeyboard(id: string, numKeys: number, octave: number, startFromC: boolean): PianoKeyboard;
}

export interface HardwareButton extends HardwareControl {
  pressedAction(): HardwareAction;
  releasedAction(): HardwareAction;
  isPressed(): BooleanValue;
  setLabel(label: string): void;
  setLabelColor(color: Color): void;
}

export interface HardwareControl {
  setLabel(label: string): void;
  getLabelColor(): SettableColorValue;
  isBeingTouched(): BooleanValue;
}

export interface HardwareSlider extends ContinuousHardwareControl<AbsoluteHardwareValueMatcher> {
  // Slider-specific methods
}

export interface HardwareKnob extends ContinuousHardwareControl<AbsoluteHardwareValueMatcher> {
  // Knob-specific methods
}

export interface AbsoluteHardwareKnob extends HardwareKnob {
  // Absolute knob methods
}

export interface RelativeHardwareKnob extends HardwareKnob {
  setAdjustValueMatcher(matcher: RelativeHardwareValueMatcher): void;
}

export interface ContinuousHardwareControl<T extends HardwareValueMatcher> extends HardwareControl {
  setAdjustValueMatcher(matcher: T): void;
  value(): DoubleValue;
}

export interface HardwareAction {
  setActionMatcher(actionMatcher: HardwareActionMatcher): void;
  setBinding(target: HardwareActionBindable): void;
}

export interface HardwareActionMatcher {
  // Action matcher interface
}

export interface HardwareValueMatcher {
  // Value matcher interface
}

export interface AbsoluteHardwareValueMatcher extends HardwareValueMatcher {
  // Absolute value matcher
}

export interface RelativeHardwareValueMatcher extends HardwareValueMatcher {
  // Relative value matcher
}

export interface HardwareActionBindable {
  // Action bindable interface
}

export interface AbsoluteHardwarControlBindable {
  // Absolute control bindable
}

export interface RelativeHardwarControlBindable {
  // Relative control bindable
}

// ===========================================================================================
// VALUES & OBSERVABLES
// ===========================================================================================

export interface Observable<T> {
  addValueObserver(callback: (value: T) => void): void;
  markInterested(): void;
}

export interface Value<T> extends Observable<T> {
  get(): T;
}

export interface SettableValue<T> extends Value<T> {
  set(value: T): void;
}

export interface BooleanValue extends Value<boolean> {
  toggle(): void;
}

export interface DoubleValue extends Value<number> {
  // Double value methods
}

export interface SettableDoubleValue extends DoubleValue, SettableValue<number> {
  inc(amount: number, resolution?: number): void;
  dec(amount: number, resolution?: number): void;
  reset(): void;
  setIndication(shouldIndicate: boolean): void;
}

export interface StringValue extends Value<string> {
  // String value methods
}

export interface SettableStringValue extends StringValue, SettableValue<string> {
  // Settable string value methods
}

export interface IntegerValue extends Value<number> {
  // Integer value methods
}

export interface SettableIntegerValue extends IntegerValue, SettableValue<number> {
  inc(): void;
  dec(): void;
}

export interface ColorValue extends Value<Color> {
  // Color value methods
}

export interface SettableColorValue extends ColorValue, SettableValue<Color> {
  // Settable color value methods
}

export interface EnumValue extends Value<string> {
  // Enum value methods
}

export interface SettableEnumValue extends EnumValue, SettableValue<string> {
  getOptions(): string[];
}

// ===========================================================================================
// GRAPHICS & UI
// ===========================================================================================

export interface Color {
  getRed(): number;
  getGreen(): number;
  getBlue(): number;
  getAlpha(): number;
  toHex(): string;
}

export interface MemoryBlock {
  // Memory block interface
}

export interface Bitmap {
  // Bitmap interface
}

export interface Image {
  // Image interface
}

export interface FontFace {
  // Font face interface
}

export interface FontOptions {
  // Font options interface
}

export interface OnOffHardwareLight {
  // Hardware light interface
  isOn(): BooleanValue;
  onColor(): SettableColorValue;
  offColor(): SettableColorValue;
}

export interface HardwareTextDisplay {
  line(index: number): HardwareTextDisplayLine;
}

export interface MultiLineHardwareTextDisplay {
  line(index: number): HardwareTextDisplayLine;
  cell(column: number, row: number): HardwareTextDisplayLine;
}

export interface HardwareTextDisplayLine {
  text(): SettableStringValue;
  backgroundColor(): SettableColorValue;
  textColor(): SettableColorValue;
}

export interface PianoKeyboard {
  // Piano keyboard interface
}

// ===========================================================================================
// TRANSPORT & TIME
// ===========================================================================================

/**
 * The Transport interface provides access to Bitwig Studio's transport controls and playback state.
 * Use this to control playback, recording, and monitor transport status.
 */
export interface Transport {
  // Status Properties

  /**
   * Indicates whether the transport is currently playing.
   * @returns BooleanValue that tracks play state
   * @since API version 1
   */
  isPlaying(): BooleanValue;

  /**
   * Indicates whether arranger recording is enabled.
   * @returns BooleanValue that tracks arranger record state
   * @since API version 1
   */
  isArrangerRecordEnabled(): BooleanValue;

  /**
   * Indicates whether arranger overdub is enabled.
   * @returns BooleanValue that tracks arranger overdub state
   * @since API version 1
   */
  isArrangerOverdubEnabled(): BooleanValue;

  /**
   * Indicates whether clip launcher automation write is enabled.
   * @returns BooleanValue that tracks automation write state
   * @since API version 1
   */
  isClipLauncherAutomationWriteEnabled(): BooleanValue;

  /**
   * Indicates whether clip launcher overdub is enabled.
   * @returns BooleanValue that tracks clip launcher overdub state
   * @since API version 1
   */
  isClipLauncherOverdubEnabled(): BooleanValue;

  /**
   * Gets the current automation write mode.
   * @returns SettableEnumValue for the automation write mode
   * @since API version 1
   */
  automationWriteMode(): SettableEnumValue;

  /**
   * Indicates whether arranger automation write is enabled.
   * @returns BooleanValue that tracks arranger automation write state
   * @since API version 1
   */
  isArrangerAutomationWriteEnabled(): BooleanValue;

  /**
   * Indicates whether arranger loop is enabled.
   * @returns BooleanValue that tracks loop state
   * @since API version 1
   */
  isArrangerLoopEnabled(): BooleanValue;

  /**
   * Indicates whether punch-in recording is enabled.
   * @returns BooleanValue that tracks punch-in state
   * @since API version 1
   */
  isPunchInEnabled(): BooleanValue;

  /**
   * Indicates whether punch-out recording is enabled.
   * @returns BooleanValue that tracks punch-out state
   * @since API version 1
   */
  isPunchOutEnabled(): BooleanValue;

  /**
   * Indicates whether the metronome is enabled.
   * @returns BooleanValue that tracks metronome state
   * @since API version 1
   */
  isMetronomeEnabled(): BooleanValue;

  /**
   * Indicates whether the metronome is audible during pre-roll.
   * @returns BooleanValue that tracks metronome pre-roll state
   * @since API version 1
   */
  isMetronomeAudibleDuringPreRoll(): BooleanValue;

  /**
   * Indicates whether the metronome is audible during pre-count.
   * @returns BooleanValue that tracks metronome pre-count state
   * @since API version 1
   */
  isMetronomeAudibleDuringPreCount(): BooleanValue;

  /**
   * Gets the pre-roll setting.
   * @returns SettableEnumValue for the pre-roll mode
   * @since API version 1
   */
  preRoll(): SettableEnumValue;

  /**
   * Gets the current playhead position.
   * @returns BeatTimeValue representing the current position in beats
   * @since API version 1
   */
  getPosition(): BeatTimeValue;

  /**
   * Gets the loop in position.
   * @returns BeatTimeValue representing the loop start position
   * @since API version 1
   */
  getInPosition(): BeatTimeValue;

  /**
   * Gets the loop out position.
   * @returns BeatTimeValue representing the loop end position
   * @since API version 1
   */
  getOutPosition(): BeatTimeValue;

  /**
   * Gets the crossfade parameter for smooth transitions.
   * @returns Parameter for controlling crossfade amount
   * @since API version 1
   */
  getCrossfade(): Parameter;

  /**
   * Gets the current time signature.
   * @returns TimeSignatureValue representing bars/beats structure
   * @since API version 1
   */
  timeSignature(): TimeSignatureValue;

  /**
   * Gets the play start position setting.
   * @returns SettableDoubleValue for the play start position
   * @since API version 1
   */
  playStartPosition(): SettableDoubleValue;

  /**
   * Gets the default launch quantization setting.
   * @returns SettableEnumValue for quantization options
   * @since API version 1
   */
  defaultLaunchQuantization(): SettableEnumValue;

  // Transport Control Actions

  /**
   * Starts playback from the current position.
   * @since API version 1
   */
  play(): void;

  /**
   * Stops playback and keeps the playhead at current position.
   * @since API version 1
   */
  stop(): void;

  /**
   * Restarts playback from the beginning of the arrangement.
   * @since API version 1
   */
  restart(): void;

  /**
   * Enables/toggles recording mode.
   * @since API version 1
   */
  record(): void;

  /**
   * Moves the playhead backwards (fast rewind).
   * @since API version 1
   */
  rewind(): void;

  /**
   * Moves the playhead forwards (fast forward).
   * @since API version 1
   */
  fastForward(): void;

  /**
   * Toggles between play and pause states.
   * @since API version 1
   */
  togglePlay(): void;

  /**
   * Sets the playhead to a specific position.
   * @param beats The position in beats to jump to
   * @since API version 1
   */
  setPosition(beats: number): void;

  /**
   * Launches playback from the configured play start position.
   * @since API version 1
   */
  launchFromPlayStartPosition(): void;

  /**
   * Jumps the playhead to the next cue marker.
   * @since API version 1
   */
  jumpToNextCueMarker(): void;

  /**
   * Jumps the playhead to the previous cue marker.
   * @since API version 1
   */
  jumpToPreviousCueMarker(): void;

  /**
   * Records a tap for tempo detection and adjustment.
   * @since API version 1
   */
  tapTempo(): void;

  // Observer Methods

  /**
   * Adds an observer for transport play state changes.
   * @param callback Function called when play state changes
   * @since API version 1
   */
  addIsPlayingObserver(callback: (isPlaying: boolean) => void): void;

  /**
   * Adds an observer for playhead position changes.
   * @param callback Function called when position changes
   * @param ppqInterval The interval in pulses per quarter note for updates
   * @since API version 1
   */
  addPlayPositionObserver(callback: (position: number) => void, ppqInterval: number): void;
}

export interface BeatTimeValue extends Value<number> {
  // Beat time value methods
}

export interface TimeSignatureValue extends Value<TimeSignature> {
  // Time signature value methods
}

export interface TimeSignature {
  numerator(): number;
  denominator(): number;
}

export interface BeatTimeFormatter {
  // Beat time formatter methods
}

// ===========================================================================================
// PROJECT & APPLICATION
// ===========================================================================================

export interface Project {
  getName(): StringValue;
  hasSoloed(): BooleanValue;
  getRootTrackGroup(): TrackBank;
  getShownTopLevelTrackGroup(): TrackBank;
  createSceneBank(numScenes: number): SceneBank;
}

export interface Application {
  getVersion(): StringValue;
  hasActiveEngine(): BooleanValue;
  projectName(): StringValue;
  platformType(): Value<PlatformType>;
  displayName(): StringValue;
  canUndo(): BooleanValue;
  canRedo(): BooleanValue;
  undoText(): StringValue;
  redoText(): StringValue;
  recordQuantizationGrid(): SettableEnumValue;
  recordQuantizeNoteLength(): SettableEnumValue;

  // Actions
  undo(): void;
  redo(): void;
  quit(): void;
  restart(): void;
  getAction(id: string): Action;
  getActionCategory(id: string): ActionCategory;
  arrowKeyLeft(): void;
  arrowKeyUp(): void;
  arrowKeyRight(): void;
  arrowKeyDown(): void;
  escape(): void;
  enter(): void;
  selectAll(): void;
  selectNone(): void;
  cut(): void;
  copy(): void;
  paste(): void;
  duplicate(): void;
  delete(): void;
  zoomToFit(): void;
  zoomIn(): void;
  zoomOut(): void;
}

export interface Action {
  // Action interface
  invoke(): void;
  getName(): string;
}

export interface ActionCategory {
  // Action category interface
  getActions(): Action[];
  getName(): string;
}

export interface Arranger {
  hasDoubleRowTrackHeight(): BooleanValue;
  trackHeight(): SettableEnumValue;
  cueMarkerVisibility(): BooleanValue;
  playbackFollow(): BooleanValue;
  trackRowHeight(): SettableEnumValue;
  isClipLauncherVisible(): BooleanValue;
  isIoSectionVisible(): BooleanValue;
  isMeterSectionVisible(): BooleanValue;
  isTimelineVisible(): BooleanValue;

  // Actions
  toggleDoubleRowTrackHeight(): void;
  toggleCueMarkerVisibility(): void;
  togglePlaybackFollow(): void;
  toggleTrackRowHeight(): void;
  toggleClipLauncherVisibility(): void;
  toggleIoSectionVisibility(): void;
  toggleMeterSectionVisibility(): void;
  toggleTimelineVisibility(): void;
}

export interface Mixer {
  isClipLauncherSectionVisible(): BooleanValue;
  isIoSectionVisible(): BooleanValue;
  isMeterSectionVisible(): BooleanValue;
  isSendSectionVisible(): BooleanValue;
  isDeviceSectionVisible(): BooleanValue;

  // Actions
  toggleClipLauncherSectionVisibility(): void;
  toggleIoSectionVisibility(): void;
  toggleMeterSectionVisibility(): void;
  toggleSendSectionVisibility(): void;
  toggleDeviceSectionVisibility(): void;
}

export interface DetailEditor {
  // Detail editor interface
}

export interface Groove {
  getEnabled(): BooleanValue;
  getShuffleAmount(): Parameter;
  getShuffleRate(): SettableEnumValue;
  getAccentAmount(): Parameter;
  getAccentRate(): SettableEnumValue;
  getAccentPhase(): SettableEnumValue;

  // Actions
  toggleEnabled(): void;
}

// ===========================================================================================
// TRACKS & DEVICES
// ===========================================================================================

export interface TrackBank {
  getItemAt(index: number): Track;
  getTrack(index: number): Track;
  scrollPosition(): SettableIntegerValue;
  itemCount(): IntegerValue;
  canScrollForwards(): BooleanValue;
  canScrollBackwards(): BooleanValue;
  setSizeOfBank(size: number): void;
  scrollBy(amount: number): void;
  scrollIntoView(position: number): void;

  // Navigation
  scrollForwards(): void;
  scrollBackwards(): void;
  scrollPageUp(): void;
  scrollPageDown(): void;
  scrollToTop(): void;
  scrollToBottom(): void;
}

export interface EffectTrackBank extends TrackBank {
  // Effect track bank specific methods
}

/**
 * Represents a track in Bitwig Studio, providing access to all track properties and controls.
 * This includes audio tracks, instrument tracks, hybrid tracks, and group tracks.
 */
export interface Track {
  // Basic Properties

  /**
   * Gets the name of the track.
   * @returns StringValue that tracks the current track name
   * @since API version 1
   */
  name(): StringValue;

  /**
   * Indicates whether this track exists in the current context.
   * @returns BooleanValue that tracks if the track exists
   * @since API version 1
   */
  exists(): BooleanValue;

  /**
   * Indicates whether this track is currently activated (enabled).
   * @returns BooleanValue that tracks the track's activation state
   * @since API version 1
   */
  isActivated(): BooleanValue;

  /**
   * Indicates whether this track is currently selected.
   * @returns BooleanValue that tracks the selection state
   * @since API version 1
   */
  isSelected(): BooleanValue;

  /**
   * Indicates whether there is a next track in the bank.
   * @returns BooleanValue that tracks if next track is available
   * @since API version 1
   */
  hasNext(): BooleanValue;

  /**
   * Indicates whether there is a previous track in the bank.
   * @returns BooleanValue that tracks if previous track is available
   * @since API version 1
   */
  hasPrevious(): BooleanValue;

  /**
   * Gets the type of this track (audio, instrument, hybrid, group, etc.).
   * @returns StringValue representing the track type
   * @since API version 1
   */
  trackType(): StringValue;

  /**
   * Gets the position/index of this track.
   * @returns IntegerValue representing the track position
   * @since API version 1
   */
  position(): IntegerValue;

  /**
   * Indicates whether this is a group track containing other tracks.
   * @returns BooleanValue that tracks if this is a group track
   * @since API version 1
   */
  isGroup(): BooleanValue;

  /**
   * Gets the track color for visual identification.
   * @returns SettableColorValue for the track color
   * @since API version 1
   */
  color(): SettableColorValue;

  // Audio Controls

  /**
   * Gets the track volume control.
   * @returns Parameter for controlling track volume (0.0 to 1.0)
   * @since API version 1
   */
  volume(): Parameter;

  /**
   * Gets the track pan control.
   * @returns Parameter for controlling stereo pan (-1.0 to 1.0)
   * @since API version 1
   */
  pan(): Parameter;

  /**
   * Gets the track mute state.
   * @returns SettableBooleanValue for mute on/off
   * @since API version 1
   */
  mute(): SettableBooleanValue;

  /**
   * Gets the track solo state.
   * @returns SettableBooleanValue for solo on/off
   * @since API version 1
   */
  solo(): SettableBooleanValue;

  /**
   * Gets the track record arm state.
   * @returns SettableBooleanValue for record arm on/off
   * @since API version 1
   */
  arm(): SettableBooleanValue;

  /**
   * Gets the track monitoring state.
   * @returns SettableBooleanValue for monitor on/off
   * @since API version 1
   */
  monitor(): SettableBooleanValue;

  /**
   * Gets the crossfade mode for this track (A, B, or None).
   * @returns SettableEnumValue for crossfade assignment
   * @since API version 1
   */
  crossFadeMode(): SettableEnumValue;

  /**
   * Indicates whether playback on this track is currently stopped.
   * @returns BooleanValue that tracks the stopped state
   * @since API version 1
   */
  isStopped(): BooleanValue;

  /**
   * Gets information about currently playing notes on this track.
   * @returns PlayingNoteArrayValue with active note information
   * @since API version 1
   */
  playingNotes(): PlayingNoteArrayValue;

  /**
   * Gets the source selector for choosing track input sources.
   * @returns SourceSelector for input routing
   * @since API version 1
   */
  sourceSelector(): SourceSelector;

  // Send Effects

  /**
   * Gets a specific send effect by index.
   * @param index The send index (0-based)
   * @returns Send object for the specified send
   * @since API version 1
   */
  getSend(index: number): Send;

  /**
   * Gets the bank of send effects for this track.
   * @returns SendBank containing all available sends
   * @since API version 1
   */
  sendBank(): SendBank;

  // Clips

  /**
   * Gets the clip launcher slot bank for this track.
   * @returns ClipLauncherSlotBank for launching clips
   * @since API version 1
   */
  clipLauncherSlotBank(): ClipLauncherSlotBank;

  // Devices

  /**
   * Gets the device chain for this track (instruments and effects).
   * @returns DeviceChain containing all devices on this track
   * @since API version 1
   */
  deviceChain(): DeviceChain;  // Actions
  selectInMixer(): void;
  selectInEditor(): void;
  makeVisibleInArranger(): void;
  makeVisibleInMixer(): void;
  selectFirst(): void;
  selectLast(): void;
  selectNext(): void;
  selectPrevious(): void;
  selectFirstInGroup(track: Track): void;
  selectLastInGroup(track: Track): void;
  addVstInstrument(): Device;
  addVstEffect(): Device;
  duplicate(): void;
  stop(): void;
  returnToArrangement(): void;

  // Observers
  addIsSelectedInMixerObserver(callback: (isSelected: boolean) => void): void;
  addIsSelectedInEditorObserver(callback: (isSelected: boolean) => void): void;
  addNameObserver(numChars: number, textWhenUnassigned: string, callback: (name: string) => void): void;
  addVuMeterObserver(range: number, channel: number, peak: boolean, callback: (value: number) => void): void;
  addPlayingNotesObserver(callback: (notes: PlayingNote[]) => void): void;
}

export interface CursorTrack extends Track {
  hasNext(): BooleanValue;
  hasPrevious(): BooleanValue;
  selectNext(): void;
  selectPrevious(): void;
  selectChannel(name: string): void;
  selectParent(): void;
  selectFirstChild(): void;
  navigateInto(): void;
  navigateUp(): void;
  getPrimaryDevice(): CursorDevice;
  createCursorDevice(): CursorDevice;
  createCursorDevice(name: string): CursorDevice;
  createCursorDevice(name: string, id: string, numSends: number, followSelection: CursorDeviceFollowMode): CursorDevice;
}

export interface MasterTrack extends Track {
  // Master track specific methods
}

export interface SettableBooleanValue extends BooleanValue, SettableValue<boolean> {
  toggle(): void;
}

export interface PlayingNoteArrayValue extends Value<PlayingNote[]> {
  // Playing note array value
}

export interface PlayingNote {
  pitch(): number;
  velocity(): number;
}

export interface Send {
  value(): Parameter;
  sendChannelColor(): ColorValue;
  exists(): BooleanValue;
}

export interface SendBank {
  getItemAt(index: number): Send;
  itemCount(): IntegerValue;
}

export interface SourceSelector {
  hasAudioInputSelected(): BooleanValue;
  hasNoteInputSelected(): BooleanValue;
}

// ===========================================================================================
// DEVICES & PARAMETERS
// ===========================================================================================

export interface DeviceChain {
  deviceBank(): DeviceBank;
  endOfDeviceChainInsertionPoint(): InsertionPoint;
  startOfDeviceChainInsertionPoint(): InsertionPoint;
}

export interface DeviceBank {
  getDevice(index: number): Device;
  getItemAt(index: number): Device;
  itemCount(): IntegerValue;
  scrollPosition(): SettableIntegerValue;
  canScrollForwards(): BooleanValue;
  canScrollBackwards(): BooleanValue;
  scrollBy(amount: number): void;
  scrollForwards(): void;
  scrollBackwards(): void;
  setSizeOfBank(size: number): void;
}

export interface Device extends ObjectProxy {
  name(): StringValue;
  exists(): BooleanValue;
  isEnabled(): SettableBooleanValue;
  isPlugin(): BooleanValue;
  position(): IntegerValue;
  hasNext(): BooleanValue;
  hasPrevious(): BooleanValue;
  deviceType(): StringValue;
  presetName(): StringValue;
  presetCategory(): StringValue;
  presetCreator(): StringValue;
  isRemoteControlsSectionVisible(): BooleanValue;
  isExpanded(): BooleanValue;
  isParameterPageSectionVisible(): BooleanValue;
  isNested(): BooleanValue;
  isWindowOpen(): BooleanValue;
  canHaveDeviceInsertedBefore(): BooleanValue;
  canHaveDeviceInsertedAfter(): BooleanValue;

  // Parameters
  getParameter(index: number): Parameter;
  getMacro(index: number): Macro;
  getModulationSource(index: number): ModulationSource;
  getCommonParameter(index: number): Parameter;
  getEnvelopeParameter(index: number): Parameter;
  getParameterBank(): ParameterBank;
  createCursorRemoteControlsPage(numParameters: number): CursorRemoteControlsPage;
  createCursorRemoteControlsPage(name: string, numParameters: number, filterParameter: string): CursorRemoteControlsPage;

  // Device chain (for instruments and effect racks)
  getDeviceChain(): DeviceChain;

  // Presets
  presetBank(): PresetBank;

  // Actions
  selectNext(): void;
  selectPrevious(): void;
  selectFirst(): void;
  selectLast(): void;
  browseToReplaceDevice(): void;
  browseToInsertBeforeDevice(): void;
  browseToInsertAfterDevice(): void;
  deleteDevice(): void;
  duplicate(): void;
  beforeDeviceInsertionPoint(): InsertionPoint;
  afterDeviceInsertionPoint(): InsertionPoint;
  replaceDeviceInsertionPoint(): InsertionPoint;
  toggleRemoteControlsSectionVisibility(): void;
  toggleExpanded(): void;
  toggleParameterPageSectionVisibility(): void;
  toggleWindowOpen(): void;

  // Observers
  addNameObserver(numChars: number, textWhenUnassigned: string, callback: (name: string) => void): void;
  addPositionObserver(callback: (position: number) => void): void;
  addExistsObserver(callback: (exists: boolean) => void): void;
  addIsEnabledObserver(callback: (enabled: boolean) => void): void;
}

export interface CursorDevice extends Device {
  selectParent(): void;
  selectChannel(): void;
  hasDrumPads(): BooleanValue;
  hasLayers(): BooleanValue;
  hasDrumMachine(): BooleanValue;
  canSelectDevice(direction: DeviceNavigationDirection): BooleanValue;
  selectDevice(direction: DeviceNavigationDirection): void;

  // Device layers
  createLayerBank(numChannels: number): DeviceLayerBank;
  createDrumPadBank(numPads: number): DrumPadBank;

  // Slots
  slotBank(): DeviceSlotBank;
}

export enum DeviceNavigationDirection {
  Previous = "Previous",
  Next = "Next"
}

export enum CursorDeviceFollowMode {
  FOLLOW_SELECTION = "FOLLOW_SELECTION",
  FIRST_INSTRUMENT = "FIRST_INSTRUMENT",
  FIRST_AUDIO_EFFECT = "FIRST_AUDIO_EFFECT",
  FIRST_INSTRUMENT_OR_DEVICE = "FIRST_INSTRUMENT_OR_DEVICE"
}

export interface DeviceLayerBank {
  getChannel(index: number): DeviceLayer;
  selectedChannel(): DeviceLayer;
  scrollPosition(): SettableIntegerValue;
}

export interface DeviceLayer {
  name(): StringValue;
  color(): SettableColorValue;
  exists(): BooleanValue;
  isSelected(): BooleanValue;
  volume(): Parameter;
  pan(): Parameter;
  mute(): SettableBooleanValue;
  solo(): SettableBooleanValue;
  isActivated(): BooleanValue;
  deviceChain(): DeviceChain;

  // Actions
  select(): void;
  selectInMixer(): void;
  selectInEditor(): void;
  makeVisibleInArranger(): void;
  makeVisibleInMixer(): void;
}

export interface DrumPadBank {
  getChannel(index: number): DrumPad;
  selectedChannel(): DrumPad;
  scrollPosition(): SettableIntegerValue;
  exists(index: number): BooleanValue;
  clearSolo(): void;
  clearMute(): void;
  hasSoloedPads(): BooleanValue;
  hasMutedPads(): BooleanValue;
}

export interface DrumPad extends DeviceLayer {
  // Drum pad specific methods
}

export interface DeviceSlotBank {
  getItemAt(index: number): DeviceSlot;
  itemCount(): IntegerValue;
}

export interface DeviceSlot {
  name(): StringValue;
  hasDevices(): BooleanValue;
  isSelected(): BooleanValue;
  browse(): void;
  select(): void;
  deleteObjects(): void;
}

/**
 * Represents a controllable parameter in Bitwig Studio (volume, pan, effect parameters, etc.).
 * Parameters can be automated, modulated, and controlled via MIDI or scripts.
 */
export interface Parameter extends SettableDoubleValue {
  // Basic Properties

  /**
   * Gets the name/label of this parameter.
   * @returns StringValue representing the parameter name
   * @since API version 1
   */
  name(): StringValue;

  /**
   * Gets the formatted display value of this parameter (e.g., "50%", "-12dB").
   * @returns StringValue with the human-readable parameter value
   * @since API version 1
   */
  displayedValue(): StringValue;

  /**
   * Gets the modulated value of this parameter (including modulation).
   * @returns DoubleValue representing the final modulated value
   * @since API version 1
   */
  modulatedValue(): DoubleValue;

  /**
   * Indicates whether this parameter exists and is available.
   * @returns BooleanValue that tracks parameter existence
   * @since API version 1
   */
  exists(): BooleanValue;

  // Value Manipulation

  /**
   * Gets a formatted label for a specific parameter value.
   * @param value The parameter value (0.0 to 1.0) to get label for
   * @returns String representation of that value
   * @since API version 1
   */
  getLabelForValue(value: number): string;

  /**
   * Resets the parameter to its default value.
   * @since API version 1
   */
  resetToDefault(): void;

  /**
   * Indicates whether this parameter is currently being touched/adjusted.
   * @param isBeingTouched True when starting to touch, false when releasing
   * @since API version 1
   */
  touch(isBeingTouched: boolean): void;

  /**
   * Gets the current touch state of this parameter.
   * @returns BooleanValue indicating if parameter is being touched
   * @since API version 1
   */
  isBeingTouched(): BooleanValue;

  // Modulation

  /**
   * Sets a modulation source for this parameter.
   * @param source The ModulationSource to assign to this parameter
   * @since API version 1
   */
  setModulationSource(source: ModulationSource): void;

  /**
   * Gets the currently assigned modulation source.
   * @returns ModulationSource assigned to this parameter
   * @since API version 1
   */
  getModulationSource(): ModulationSource;

  /**
   * Gets the modulation amount parameter.
   * @returns SettableDoubleValue for controlling modulation depth
   * @since API version 1
   */
  modulationValue(): SettableDoubleValue;

  // Observer Methods

  /**
   * Adds an observer for parameter name changes.
   * @param numChars Maximum number of characters for the name
   * @param textWhenUnassigned Text to show when parameter is not assigned
   * @param callback Function called when name changes
   * @since API version 1
   */
  addNameObserver(numChars: number, textWhenUnassigned: string, callback: (name: string) => void): void;

  /**
   * Adds an observer for parameter value changes.
   * @param callback Function called when parameter value changes (0.0 to 1.0)
   * @since API version 1
   */
  addValueObserver(callback: (value: number) => void): void;

  /**
   * Adds an observer for parameter display value changes.
   * @param numChars Maximum number of characters for the display value
   * @param callback Function called when display value changes
   * @since API version 1
   */
  addValueDisplayObserver(numChars: number, callback: (value: string) => void): void;
}

export interface Macro extends Parameter {
  // Macro specific methods
  getModulatedParameters(): Parameter[];
  addModulatedParameterObserver(callback: (parameters: Parameter[]) => void): void;
}

export interface ModulationSource {
  name(): StringValue;
  isMapping(): BooleanValue;
  isMappingToModulationTarget(): BooleanValue;
  toggleIsMapping(): void;
}

export interface ParameterBank {
  getParameter(index: number): Parameter;
  getItemAt(index: number): Parameter;
  itemCount(): IntegerValue;
  pageCount(): IntegerValue;
  selectedPageIndex(): SettableIntegerValue;
  canScrollPageForwards(): BooleanValue;
  canScrollPageBackwards(): BooleanValue;
  scrollForwards(): void;
  scrollBackwards(): void;
}

export interface CursorRemoteControlsPage {
  selectedPageIndex(): IntegerValue;
  pageNames(): StringArrayValue;
  getParameter(index: number): RemoteControl;
  getName(): string;
  selectNextPage(): void;
  selectPreviousPage(): void;
  selectPage(index: number): void;
}

export interface RemoteControl extends Parameter {
  // Remote control specific methods
}

export interface StringArrayValue extends Value<string[]> {
  // String array value
}

// ===========================================================================================
// PRESETS & BROWSER
// ===========================================================================================

export interface PresetBank {
  getPreset(index: number): Preset;
  loadPreset(preset: Preset): void;
}

export interface Preset {
  name(): StringValue;
  creator(): StringValue;
  category(): StringValue;
}

export interface PopupBrowser {
  exists(): BooleanValue;
  selectedContentType(): StringValue;
  selectedContentTypeName(): StringValue;
  contentTypeNames(): StringArrayValue;
  smartCollectionColumns(): BrowserFilterColumnBank;
  locationColumns(): BrowserFilterColumnBank;
  deviceColumns(): BrowserFilterColumnBank;
  categoryColumns(): BrowserFilterColumnBank;
  tagColumns(): BrowserFilterColumnBank;
  deviceTypeColumns(): BrowserFilterColumnBank;
  fileTypeColumns(): BrowserFilterColumnBank;
  creatorColumns(): BrowserFilterColumnBank;

  resultColumnCount(): IntegerValue;
  resultsColumn(): BrowserResultsColumn;
  previewChannel(): Channel;

  shouldAudition(): SettableBooleanValue;

  // Actions
  cancel(): void;
  commit(): void;
  loadSelectedItem(): void;
  selectContentType(name: string): void;
  startBrowsing(): void;
}

export interface BrowserFilterColumnBank {
  getItemAt(index: number): BrowserFilterColumn;
  itemCount(): IntegerValue;
  exists(index: number): BooleanValue;
}

export interface BrowserFilterColumn {
  name(): StringValue;
  exists(): BooleanValue;
  getWildcardItem(): BrowserFilterItem;
  getItem(index: number): BrowserFilterItem;
  itemCount(): IntegerValue;
}

export interface BrowserFilterItem {
  name(): StringValue;
  exists(): BooleanValue;
  isSelected(): BooleanValue;
  hitCount(): IntegerValue;
  select(): void;
}

export interface BrowserResultsColumn {
  getItem(index: number): BrowserResultsItem;
  itemCount(): IntegerValue;
}

export interface BrowserResultsItem {
  name(): StringValue;
  exists(): BooleanValue;
  isSelected(): BooleanValue;
  select(): void;
}

export interface Channel {
  // Channel interface for browser preview
}

// ===========================================================================================
// CLIPS & SCENES
// ===========================================================================================

export interface ClipLauncherSlotBank {
  select(slot: number): void;
  getItemAt(index: number): ClipLauncherSlot;
  launch(slot: number): void;
  record(slot: number): void;
  deleteClip(slot: number): void;
  showInEditor(slot: number): void;
  createEmptyClip(slot: number, lengthInBeats: number): void;
  duplicateClip(slot: number): void;
  selectSlot(slot: number): void;
  stop(): void;
  returnToArrangement(): void;
  setIndication(shouldIndicate: boolean): void;
  itemCount(): IntegerValue;
  scrollPosition(): SettableIntegerValue;
  canScrollForwards(): BooleanValue;
  canScrollBackwards(): BooleanValue;
  scrollBy(amount: number): void;
  scrollForwards(): void;
  scrollBackwards(): void;
}

export interface ClipLauncherSlot extends ClipLauncherSlotOrScene {
  hasContent(): BooleanValue;
  name(): StringValue;
  color(): SettableColorValue;
  isSelected(): BooleanValue;
  isPlaying(): BooleanValue;
  isStopQueued(): BooleanValue;
  isRecording(): BooleanValue;
  isRecordingQueued(): BooleanValue;
  isPlaybackQueued(): BooleanValue;

  // Actions
  select(): void;
  launch(): void;
  launchAlt(): void;
  record(): void;
  stop(): void;
  deleteObject(): void;
  duplicate(): void;
  duplicateContent(): void;
  showInEditor(): void;
  createEmptyClip(lengthInBeats: number): void;
  selectInEditor(): void;

  // Observers
  addHasContentObserver(callback: (hasContent: boolean) => void): void;
  addIsPlayingObserver(callback: (isPlaying: boolean) => void): void;
  addIsRecordingObserver(callback: (isRecording: boolean) => void): void;
  addIsSelectedObserver(callback: (isSelected: boolean) => void): void;
  addNameObserver(numChars: number, textWhenUnassigned: string, callback: (name: string) => void): void;
  addColorObserver(callback: (red: number, green: number, blue: number) => void): void;
  addPlaybackStateObserver(callback: (state: number) => void): void;
}

export interface ClipLauncherSlotOrScene {
  // Base interface for slots and scenes
}

export interface SceneBank {
  getScene(index: number): Scene;
  getItemAt(index: number): Scene;
  launchScene(scene: number): void;
  showInEditor(scene: number): void;
  createEmptyScene(scene: number, lengthInBeats: number): void;
  itemCount(): IntegerValue;
  scrollPosition(): SettableIntegerValue;
  canScrollForwards(): BooleanValue;
  canScrollBackwards(): BooleanValue;
  scrollBy(amount: number): void;
  scrollForwards(): void;
  scrollBackwards(): void;
}

export interface Scene extends ClipLauncherSlotOrScene {
  name(): StringValue;
  exists(): BooleanValue;
  color(): SettableColorValue;
  sceneIndex(): IntegerValue;

  // Actions
  selectInEditor(): void;
  showInEditor(): void;
  launch(): void;
  launchAlt(): void;

  // Observers
  addNameObserver(numChars: number, textWhenUnassigned: string, callback: (name: string) => void): void;
  addColorObserver(callback: (red: number, green: number, blue: number) => void): void;
}

export interface CursorClip {
  exists(): BooleanValue;
  hasContent(): BooleanValue;
  name(): StringValue;
  color(): SettableColorValue;
  track(): Track;
  clipLauncherSlot(): ClipLauncherSlot;

  // Playback
  isPlaying(): BooleanValue;
  isRecording(): BooleanValue;
  isLooping(): BooleanValue;
  getShuffle(): BooleanValue;
  getAccent(): Parameter;
  getPlayStart(): SettableDoubleValue;
  getPlayStop(): SettableDoubleValue;
  getLoopStart(): SettableDoubleValue;
  getLoopLength(): SettableDoubleValue;
  getFormattedLength(): StringValue;

  // Note editing
  getNoteStep(channel: number, step: number, note: number): NoteStep;
  toggleStep(channel: number, step: number, note: number, velocity: number): void;
  setStep(channel: number, step: number, note: number, velocity: number, duration: number): void;
  clearStep(channel: number, step: number, note: number): void;
  clearStepsAtY(channel: number, note: number): void;

  // Actions
  launch(): void;
  launchAlt(): void;
  launchReleaseAlt(): void;
  stop(): void;
  record(): void;
  overdub(): void;
  quantize(amount: number): void;
  transpose(semitones: number): void;
  selectInEditor(): void;
  showInEditor(): void;
  createEmptyClip(lengthInBeats: number): void;
  duplicate(): void;
  duplicateContent(): void;

  // Observers
  addNoteStepObserver(callback: (noteStep: NoteStep) => void): void;
  addStepDataObserver(callback: (x: number, y: number, state: number) => void): void;
  addPlayingStepObserver(callback: (step: number) => void): void;
}

export interface NoteStep {
  channel(): IntegerValue;
  x(): IntegerValue;
  y(): IntegerValue;
  note(): IntegerValue;
  velocity(): SettableDoubleValue;
  releaseVelocity(): SettableDoubleValue;
  duration(): SettableDoubleValue;
  pan(): SettableDoubleValue;
  timbre(): SettableDoubleValue;
  pressure(): SettableDoubleValue;
  gain(): SettableDoubleValue;
  transpose(): SettableIntegerValue;
  isChanceEnabled(): SettableBooleanValue;
  chance(): SettableDoubleValue;
  isOccurrenceEnabled(): SettableBooleanValue;
  occurrence(): SettableEnumValue;
  isRecurrenceEnabled(): SettableBooleanValue;
  recurrenceLength(): SettableIntegerValue;
  recurrenceMask(): SettableIntegerValue;
  isRepeatEnabled(): SettableBooleanValue;
  repeatCount(): SettableIntegerValue;
  repeatCurve(): SettableDoubleValue;
  repeatVelocityCurve(): SettableDoubleValue;
  repeatVelocityEnd(): SettableDoubleValue;

  // State
  state(): IntegerValue;

  // Actions
  clearStep(): void;
  selectInEditor(): void;
}

// ===========================================================================================
// USER CONTROLS & PREFERENCES
// ===========================================================================================

export interface UserControlBank {
  getControl(index: number): UserControl;
}

export interface UserControl extends Parameter {
  // User control methods
}

export interface Preferences {
  getBooleanSetting(category: string, key: string, defaultValue: boolean): SettableBooleanValue;
  getNumberSetting(category: string, key: string, min: number, max: number, step: number, unit: string, defaultValue: number): SettableDoubleValue;
  getStringSetting(category: string, key: string, numChars: number, defaultValue: string): SettableStringValue;
  getEnumSetting(category: string, key: string, options: string[], defaultValue: string): SettableEnumValue;
}

export interface DocumentState {
  getBooleanSetting(category: string, key: string, defaultValue: boolean): SettableBooleanValue;
  getNumberSetting(category: string, key: string, min: number, max: number, step: number, unit: string, defaultValue: number): SettableDoubleValue;
  getStringSetting(category: string, key: string, numChars: number, defaultValue: string): SettableStringValue;
  getEnumSetting(category: string, key: string, options: string[], defaultValue: string): SettableEnumValue;
}

export interface NotificationSettings {
  getShouldShowSelectionNotifications(): BooleanValue;
  getShouldShowChannelSelectionNotifications(): BooleanValue;
  getShouldShowTrackSelectionNotifications(): BooleanValue;
  getShouldShowDeviceSelectionNotifications(): BooleanValue;
  getShouldShowDeviceLayerSelectionNotifications(): BooleanValue;
  getShouldShowPresetNotifications(): BooleanValue;
  getShouldShowMappingNotifications(): BooleanValue;
  getShouldShowValueNotifications(): BooleanValue;

  setShouldShowSelectionNotifications(shouldShow: boolean): void;
  setShouldShowChannelSelectionNotifications(shouldShow: boolean): void;
  setShouldShowTrackSelectionNotifications(shouldShow: boolean): void;
  setShouldShowDeviceSelectionNotifications(shouldShow: boolean): void;
  setShouldShowDeviceLayerSelectionNotifications(shouldShow: boolean): void;
  setShouldShowPresetNotifications(shouldShow: boolean): void;
  setShouldShowMappingNotifications(shouldShow: boolean): void;
  setShouldShowValueNotifications(shouldShow: boolean): void;
}

// ===========================================================================================
// MIDI EXPRESSIONS & NETWORK
// ===========================================================================================

export interface MidiExpressions {
  createAbsoluteValueMatcher(channel: number, cc: number): AbsoluteHardwareValueMatcher;
  createRelativeSignedBitValueMatcher(channel: number, cc: number, bitCount: number): RelativeHardwareValueMatcher;
  createRelativeSignedTwosComplementValueMatcher(channel: number, cc: number, bitCount: number): RelativeHardwareValueMatcher;
  createRelativeBinOffsetValueMatcher(channel: number, cc: number, bitCount: number): RelativeHardwareValueMatcher;
  createNoteOnActionMatcher(channel: number, note: number): HardwareActionMatcher;
  createNoteOffActionMatcher(channel: number, note: number): HardwareActionMatcher;
  createCCActionMatcher(channel: number, cc: number, value: number): HardwareActionMatcher;
}

export interface RemoteConnection {
  disconnect(): void;
  send(data: string): void;
}

// ===========================================================================================
// CALLBACKS
// ===========================================================================================

export interface ConnectionEstablishedCallback {
  connectionEstablished(connection: RemoteConnection): void;
}

export interface DataReceivedCallback {
  dataReceived(data: number[]): void;
}

// ===========================================================================================
// ADDITIONAL UTILITY INTERFACES
// ===========================================================================================

export interface ObjectProxy {
  // Base interface for proxy objects
}

export interface DeleteableObject {
  deleteObject(): void;
}

export interface DuplicableObject {
  duplicate(): void;
}

export interface InsertionPoint {
  insertionIndex(): IntegerValue;
}

export interface DeviceMatcher {
  // Device matcher interface
}

export interface AudioIoDeviceMatcher {
  // Audio IO device matcher
}

export interface AudioHardwareOutputInfo {
  // Audio hardware output info
}

export interface AudioHardwareInputInfo {
  // Audio hardware input info
}

export interface MasterRecorder {
  // Master recorder interface
  isRecording(): BooleanValue;
  startRecording(): void;
  stopRecording(): void;
}

export interface OscModule {
  // OSC module interface
}

// ===========================================================================================
// GLOBAL TYPE ALIASES FOR COMMON PATTERNS
// ===========================================================================================

export type MidiCallback = (status: number, data1: number, data2: number) => void;
export type SysexCallback = (data: string) => void;
export type BooleanValueObserver = (value: boolean) => void;
export type NumberValueObserver = (value: number) => void;
export type StringValueObserver = (value: string) => void;
export type ColorValueObserver = (red: number, green: number, blue: number) => void;

// ===========================================================================================
// CONTROLLER EXTENSION HELPERS
// ===========================================================================================

/**
 * Base interface for controller extensions following Bitwig template patterns
 */
export interface ControllerExtension {
  /** Controller metadata */
  readonly vendor: string;
  readonly name: string;
  readonly version: string;
  readonly uuid: string;
  readonly author: string;

  /** MIDI port configuration */
  readonly numMidiInPorts: number;
  readonly numMidiOutPorts: number;

  /** Required API version */
  readonly requiredAPIVersion: number;

  /** Platform-specific port discovery pairs */
  getWindowsPortNames?(): { inputs: string[], outputs: string[] };
  getMacPortNames?(): { inputs: string[], outputs: string[] };
  getLinuxPortNames?(): { inputs: string[], outputs: string[] };

  /** Lifecycle methods */
  init(): void;
  flush(): void;
  exit(): void;

  /** MIDI callback handlers */
  onMidi?(port: number, status: number, data1: number, data2: number): void;
  onSysex?(port: number, data: string): void;
}

/**
 * Utility type for MIDI callback functions indexed by port
 */
export type MidiPortCallbacks = {
  [portIndex: number]: {
    onMidi: (status: number, data1: number, data2: number) => void;
    onSysex: (data: string) => void;
  };
};

/**
 * Helper function type for controller initialization following template pattern
 */
export interface ControllerInitializer {
  defineController(extension: Pick<ControllerExtension, 'vendor' | 'name' | 'version' | 'uuid' | 'author'>): void;
  defineMidiPorts(extension: Pick<ControllerExtension, 'numMidiInPorts' | 'numMidiOutPorts'>): void;
  setupPortDiscovery(extension: ControllerExtension): void;
  registerMidiCallbacks(callbacks: MidiPortCallbacks): void;
}

// ===========================================================================================
// UTILITY FUNCTIONS & HELPERS
// ===========================================================================================

/**
 * Utility functions for processing MIDI data and converting between different formats.
 * These functions help with common MIDI operations in controller scripts.
 */
export namespace MidiUtils {
  /**
   * Extracts the MIDI channel from a status byte.
   * @param status The MIDI status byte
   * @returns The channel number (0-15)
   * @example
   * const channel = MidiUtils.getChannel(0x91); // Returns 1
   */
  export function getChannel(status: number): number;

  /**
   * Extracts the MIDI message type from a status byte.
   * @param status The MIDI status byte
   * @returns The message type (0x80, 0x90, 0xB0, etc.)
   * @example
   * const msgType = MidiUtils.getMessageType(0x91); // Returns 0x90 (note on)
   */
  export function getMessageType(status: number): number;

  /**
   * Creates a MIDI status byte from message type and channel.
   * @param messageType The MIDI message type (0x80, 0x90, etc.)
   * @param channel The MIDI channel (0-15)
   * @returns The combined status byte
   * @example
   * const status = MidiUtils.createStatusByte(0x90, 1); // Returns 0x91
   */
  export function createStatusByte(messageType: number, channel: number): number;

  /**
   * Converts a 7-bit MIDI value to normalized 0-1 range.
   * @param midiValue The MIDI value (0-127)
   * @returns Normalized value (0.0-1.0)
   * @example
   * const normalized = MidiUtils.midiToNormalized(64); // Returns ~0.504
   */
  export function midiToNormalized(midiValue: number): number;

  /**
   * Converts a normalized value to 7-bit MIDI range.
   * @param normalizedValue The normalized value (0.0-1.0)
   * @returns MIDI value (0-127)
   * @example
   * const midiVal = MidiUtils.normalizedToMidi(0.5); // Returns 63
   */
  export function normalizedToMidi(normalizedValue: number): number;

  /**
   * Checks if a MIDI message is a Control Change message.
   * @param status The MIDI status byte
   * @returns True if this is a CC message
   * @example
   * const isCC = MidiUtils.isControlChange(0xB0); // Returns true
   */
  export function isControlChange(status: number): boolean;

  /**
   * Checks if a MIDI message is a Note On message.
   * @param status The MIDI status byte
   * @returns True if this is a note on message
   * @example
   * const isNoteOn = MidiUtils.isNoteOn(0x90); // Returns true
   */
  export function isNoteOn(status: number): boolean;

  /**
   * Checks if a MIDI message is a Note Off message.
   * @param status The MIDI status byte
   * @returns True if this is a note off message
   * @example
   * const isNoteOff = MidiUtils.isNoteOff(0x80); // Returns true
   */
  export function isNoteOff(status: number): boolean;

  /**
   * Converts a sysex hex string to a byte array.
   * @param sysexString Hex string representation (e.g., "F0 7E 00 F7")
   * @returns Array of byte values
   * @example
   * const bytes = MidiUtils.sysexStringToBytes("F0 7E 00 F7"); // [240, 126, 0, 247]
   */
  export function sysexStringToBytes(sysexString: string): number[];

  /**
   * Converts a byte array to sysex hex string representation.
   * @param bytes Array of byte values
   * @returns Hex string representation
   * @example
   * const sysex = MidiUtils.bytesToSysexString([240, 126, 0, 247]); // "F0 7E 00 F7"
   */
  export function bytesToSysexString(bytes: number[]): string;
}

/**
 * Common patterns for controller state management
 */
export namespace ControllerState {
  /** Button state tracker */
  export interface ButtonState {
    isPressed: boolean;
    pressTime?: number;
    releaseTime?: number;
  }

  /** Encoder/Knob state tracker */
  export interface EncoderState {
    lastValue: number;
    isDirty: boolean;
    touchState: boolean;
  }

  /** Track bank state tracker */
  export interface BankState {
    currentBank: number;
    trackOffset: number;
    sceneOffset: number;
    isShifted: boolean;
  }
}

/**
 * Common LED/Display patterns
 */
export namespace DisplayPatterns {
  /** LED states */
  export const LED_OFF: 0;
  export const LED_ON: 127;
  export const LED_DIM: 64;

  /** Common color values for RGB LEDs */
  export interface ColorValues {
    readonly OFF: readonly [0, 0, 0];
    readonly RED: readonly [127, 0, 0];
    readonly GREEN: readonly [0, 127, 0];
    readonly BLUE: readonly [0, 0, 127];
    readonly YELLOW: readonly [127, 127, 0];
    readonly CYAN: readonly [0, 127, 127];
    readonly MAGENTA: readonly [127, 0, 127];
    readonly WHITE: readonly [127, 127, 127];
  }
  export const Colors: ColorValues;
}

// ===========================================================================================
// EXPORT FOR MODULE USAGE
// ===========================================================================================

export { };