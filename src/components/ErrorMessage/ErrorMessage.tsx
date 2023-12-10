import { AxiosError } from 'axios';

import './ErrorMessage.scss';
import { useState } from 'react';
import classNames from 'classnames';

export default function ErrorMessage(props: {
  error: AxiosError;
  alertText: string;
}) {
  const { error, alertText } = props;
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  return (
    <div
      className={classNames('error-message', {
        'error-message_showed-error': isErrorVisible,
      })}
    >
      <span className="error-message__alert-text">{alertText}</span>
      <button
        className="error-message__toggle"
        onClick={() => setIsErrorVisible(!isErrorVisible)}
      >
        {isErrorVisible ? 'Свернуть' : 'Раскрыть'} ошибку
      </button>
      {isErrorVisible && (
        <pre className="error-message__message">
          {JSON.stringify(error, null, 2)}
        </pre>
      )}
    </div>
  );
}
