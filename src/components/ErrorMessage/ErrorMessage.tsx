import { AxiosError } from 'axios';

import './ErrorMessage.scss';
import { useState } from 'react';
import classNames from 'classnames';

type ErrorMessageProps = {
  error: AxiosError;
  alertText: string;
};

export default function ErrorMessage({ error, alertText }: ErrorMessageProps) {
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
