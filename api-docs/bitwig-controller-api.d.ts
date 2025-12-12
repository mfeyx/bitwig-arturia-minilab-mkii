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
 * Or if using module imports:
 * import type * as Bitwig from './api-docs/bitwig-controller-api.d.ts';
 */

declare global {
  // Global functions available in controller scripts
  function loadAPI(version: number): void;
  function println(message: string): void;
  function errorln(message: string): void;

  // Global host object
  var host: ControllerHost;

  // Standard controller lifecycle functions
  function init(): void;
  function flush(): void;
  function exit(): void;

  // Global transport object (commonly used)
  var transport: Transport;
}

// ===========================================================================================
// CORE INTERFACES
// ===========================================================================================

export interface Host {
  getHostApiVersion(): number;
  getHostVendor(): string;
  getHostProduct(): string;
  getHostVersion(): string;
  getPlatformType(): PlatformType;
  setErrorReportingEMail(address: string): void;
  getOscModule(): OscModule;
  allocateMemoryBlock(size: number): MemoryBlock;
  createBitmap(width: number, height: number, format: BitmapFormat): Bitmap;
  createFontOptions(): FontOptions;
  loadFontFace(path: string): FontFace;
  loadPNG(path: string): Image;
  loadSVG(path: string, scale: number): Image;
}

export interface ControllerHost extends Host {
  // Controller Definition Methods
  defineController(vendor: string, name: string, version: string, uuid: string, author?: string): void;
  defineMidiPorts(numInputs: number, numOutputs: number): void;
  defineSysexIdentityReply(reply: string): void;
  addDeviceNameBasedDiscoveryPair(inputs: string[], outputs: string[]): void;
  defineSysexDiscovery(request: string, reply: string): void;

  // Platform Detection
  platformIsWindows(): boolean;
  platformIsMac(): boolean;
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

export interface MidiIn {
  setMidiCallback(callback: (status: number, data1: number, data2: number) => void): void;
  setSysexCallback(callback: (data: string) => void): void;
  createNoteInput(name: string, mask?: string): NoteInput;
  setKeyTranslationTable(table: number[]): void;
  setVelocityTranslationTable(table: number[]): void;
}

export interface MidiOut {
  sendMidi(status: number, data1: number, data2: number): void;
  sendSysex(data: string): void;
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

export interface Transport {
  isPlaying(): BooleanValue;
  isArrangerRecordEnabled(): BooleanValue;
  isArrangerOverdubEnabled(): BooleanValue;
  isClipLauncherAutomationWriteEnabled(): BooleanValue;
  isClipLauncherOverdubEnabled(): BooleanValue;
  automationWriteMode(): SettableEnumValue;
  isArrangerAutomationWriteEnabled(): BooleanValue;
  isArrangerLoopEnabled(): BooleanValue;
  isPunchInEnabled(): BooleanValue;
  isPunchOutEnabled(): BooleanValue;
  isMetronomeEnabled(): BooleanValue;
  isMetronomeAudibleDuringPreRoll(): BooleanValue;
  isMetronomeAudibleDuringPreCount(): BooleanValue;
  preRoll(): SettableEnumValue;
  getPosition(): BeatTimeValue;
  getInPosition(): BeatTimeValue;
  getOutPosition(): BeatTimeValue;
  getCrossfade(): Parameter;
  timeSignature(): TimeSignatureValue;
  playStartPosition(): SettableDoubleValue;
  defaultLaunchQuantization(): SettableEnumValue;

  // Actions
  play(): void;
  stop(): void;
  restart(): void;
  record(): void;
  rewind(): void;
  fastForward(): void;
  togglePlay(): void;
  setPosition(beats: number): void;
  launchFromPlayStartPosition(): void;
  jumpToNextCueMarker(): void;
  jumpToPreviousCueMarker(): void;
  tapTempo(): void;

  // Observers
  addIsPlayingObserver(callback: (isPlaying: boolean) => void): void;
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

export interface Track {
  name(): StringValue;
  exists(): BooleanValue;
  isActivated(): BooleanValue;
  isSelected(): BooleanValue;
  hasNext(): BooleanValue;
  hasPrevious(): BooleanValue;
  trackType(): StringValue;
  position(): IntegerValue;
  isGroup(): BooleanValue;
  color(): SettableColorValue;
  volume(): Parameter;
  pan(): Parameter;
  mute(): SettableBooleanValue;
  solo(): SettableBooleanValue;
  arm(): SettableBooleanValue;
  monitor(): SettableBooleanValue;
  crossFadeMode(): SettableEnumValue;
  isStopped(): BooleanValue;
  playingNotes(): PlayingNoteArrayValue;
  sourceSelector(): SourceSelector;

  // Sends
  getSend(index: number): Send;
  sendBank(): SendBank;

  // Clips
  clipLauncherSlotBank(): ClipLauncherSlotBank;

  // Devices
  deviceChain(): DeviceChain;

  // Actions
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

export interface Parameter extends SettableDoubleValue {
  name(): StringValue;
  displayedValue(): StringValue;
  modulatedValue(): DoubleValue;
  exists(): BooleanValue;
  getLabelForValue(value: number): string;
  resetToDefault(): void;
  touch(isBeingTouched: boolean): void;
  isBeingTouched(): BooleanValue;

  // Modulation
  setModulationSource(source: ModulationSource): void;
  getModulationSource(): ModulationSource;
  modulationValue(): SettableDoubleValue;

  // Observers
  addNameObserver(numChars: number, textWhenUnassigned: string, callback: (name: string) => void): void;
  addValueObserver(callback: (value: number) => void): void;
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
 * Common utility functions for MIDI processing
 */
export namespace MidiUtils {
  /** Extract MIDI channel from status byte (0-15) */
  export function getChannel(status: number): number;

  /** Extract MIDI message type from status byte */
  export function getMessageType(status: number): number;

  /** Create a status byte from message type and channel */
  export function createStatusByte(messageType: number, channel: number): number;

  /** Convert 7-bit MIDI value to normalized 0-1 range */
  export function midiToNormalized(midiValue: number): number;

  /** Convert normalized 0-1 value to 7-bit MIDI range */
  export function normalizedToMidi(normalizedValue: number): number;

  /** Check if MIDI message is a CC message */
  export function isControlChange(status: number): boolean;

  /** Check if MIDI message is a Note On message */
  export function isNoteOn(status: number): boolean;

  /** Check if MIDI message is a Note Off message */
  export function isNoteOff(status: number): boolean;

  /** Convert sysex string to byte array */
  export function sysexStringToBytes(sysexString: string): number[];

  /** Convert byte array to sysex string */
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