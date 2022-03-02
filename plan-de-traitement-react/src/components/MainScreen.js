import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
}from '@elastic/eui';
const MainScreen = () =>{
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  let modal;
  let content;
  let activeStep = getActiveStep(steps);

  switch (activeStep) {
    case STEP1:
      content = <ModelForm closeModal={closeModal} />;
      break;

    case STEP2:
      content = <ModifierExam />;
      break;

    case STEP3:
      content = <ExamenItem />;
      break;

    default:
      content = <ModelForm closeModal={closeModal} />;
      break;
  }

  useEffect(() => {}, [steps]);

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} className="ModifierExamen" maxWidth="100%">
        <EuiModalHeader></EuiModalHeader>
        <EuiModalBody>{content}</EuiModalBody>
      </EuiModal>
    );
  }
  return (
    <div>
      <EuiButton onClick={showModal}>Show Modal</EuiButton>
      {modal}
      <style jsx={"true"}>
        {`
          .euiButton--primary.euiButton--fill {
            background: #5d9ad4 0% 0% no-repeat padding-box;
            font: normal normal normal 27px/37px Open Sans;
            letter-spacing: 0px;
            color: #ffffff;
          }

          .modelFormContainer {
            /* left: 432px;
            top: 207px; */
            width: 1057px;
          }
        `}
      </style>
    </div>
  );
};

export default MainScreen;
