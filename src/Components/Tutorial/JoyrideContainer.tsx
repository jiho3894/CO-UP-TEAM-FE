import { useState } from "react";
import ReactJoyride, { ACTIONS, CallBackProps, EVENTS, STATUS } from "react-joyride";

const buttonNext = {
  backgroundColor: "#5F99FF",
  color: "#fff",
  fontSize: "14px",
};

const buttonBack = {
  backgroundColor: "#D7DCE5",
  color: "#333",
  paddingTop: "10px",
  borderRadius: "4px",
  fontSize: "14px",
};

const JoyrideContainer = ({ run, steps, setOpen }: any) => {
  const [stepIndex, setStepIndex] = useState(0);
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
      setTimeout(() => {
        const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
        setStepIndex(stepIndex);
      }, 100);
    } else if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setOpen(false);
      setStepIndex(0);
    }
  };
  return (
    <ReactJoyride
      run={run}
      showProgress={true}
      continuous={true}
      steps={steps}
      scrollToFirstStep={false}
      disableScrolling={true}
      disableScrollParentFix={true}
      callback={handleJoyrideCallback}
      stepIndex={stepIndex}
      showSkipButton={true}
      styles={{ buttonNext: buttonNext, buttonBack: buttonBack }}
    />
  );
};

export default JoyrideContainer;
