// Scroll-triggered animation for content items
const items = document.querySelectorAll('.content-item');

const showItemsOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;

    items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if(itemTop < triggerBottom) {
            item.classList.add('show');
        } else {
            item.classList.remove('show');
        }
    });
};

window.addEventListener('scroll', showItemsOnScroll);

const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');

/**
  * UI 작업의 위험을 분석하는 평가를 만듭니다.
  *
  * projectID: Google Cloud 프로젝트 ID입니다.
  * recaptchaSiteKey: 사이트/앱과 연결된 reCAPTCHA 키입니다.
  * token: 클라이언트에서 가져온 생성된 토큰입니다.
  * recaptchaAction: 토큰에 해당하는 작업 이름입니다.
  */
async function createAssessment({
  // 할 일: 샘플을 실행하기 전에 토큰과 reCAPTCHA 작업 변수를 바꿉니다.
  projectID = "mythic-lattice-436511-v7",
  recaptchaKey = "6LeZxk8qAAAAADyugCVswZvsfO0QnX164K4O4AJr",
  token = "action-token",
  recaptchaAction = "action-name",
}) {
  // reCAPTCHA 클라이언트를 만듭니다.
  // 할 일: 클라이언트 생성 코드를 캐시하거나(권장) 메서드를 종료하기 전에 client.close()를 호출합니다.
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  // 평가 요청을 작성합니다.
  const request = ({
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  });

  const [ response ] = await client.createAssessment(request);

  // 토큰이 유효한지 확인합니다.
  if (!response.tokenProperties.valid) {
    console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
    return null;
  }

  // 예상한 작업이 실행되었는지 확인합니다.
  // The `action` property is set by user client in the grecaptcha.enterprise.execute() method.
  if (response.tokenProperties.action === recaptchaAction) {
    // 위험 점수와 이유를 가져옵니다.
    // 평가 해석에 대한 자세한 내용은 다음을 참조하세요.
    // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
    console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
    response.riskAnalysis.reasons.forEach((reason) => {
      console.log(reason);
    });

    return response.riskAnalysis.score;
  } else {
    console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
    return null;
  }
}
