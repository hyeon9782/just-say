export interface Dict {
  home: {
    title: string;
    subtitle: string;
    start_button: string;
  };
  language: {
    title: string;
  };
  city: {
    city_title: string;
    city_subtitle: string;
  };
  situation: {
    situation_title: string;
    situation_subtitle: string;
  };
  preparation: {
    preparation_title: string;
    preparation_subtitle: string;
    test_message: string;
    test_start: string;
    test_end: string;
    start: string;
  };
  conversation: {
    conversation_title: string;
    menu: string;
  };
  result: {
    success: string;
    fail: string;
    feedback_message: string;
  };
}
