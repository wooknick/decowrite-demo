import React from "react";
import Tone from "tone";
import nf from "../notesFrequency";

export default () => {
  const oscOptions = {
    type: "sine",
    frequency: nf["C#4"],
    volume: 8,
  };

  const ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.25,
    attackCurve: "linear",
    decay: 0.01,
    decayCurve: "exponential",
    sustain: 1,
    release: 1.59,
    releaseCurve: "exponential",
  }).toMaster();

  const osc = new Tone.Oscillator(oscOptions).connect(ampEnv).start(0);
  const trigger = (frequency, time, volume = 8) => {
    if (osc.frequency.value !== frequency) {
      osc.frequency.value = frequency;
    }
    if (osc.volume.value !== volume) {
      osc.volume.value = volume;
    }
    ampEnv.triggerAttackRelease(time);
  };
  return { osc, trigger };
};
