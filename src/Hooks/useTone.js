import React, { useState, useRef, useEffect } from "react";
import { Oscillator, Synth, Gain, Master } from "tone";

export default (frequency, type, fadeIn) => {
  const [isLoaded, setLoaded] = useState(false);

  const options = {
    type: "sine",
    frequency: 40,
    detune: 0,
    phase: 0,
    partials: [1, 0.6, 0.01],
    partialCount: 2,
  };
  const osc = new Oscillator(options).toMaster();
  return { osc };
};
