import classNames from 'classnames';
import './Button.scss';

type ButtonProps = {
  text: string;
  clickHandler: () => void;
  theme?: 'orange' | 'blue' | null;
  additionalClasses?: string | string[];
};

export default function Button({
  text,
  clickHandler,
  theme,
  additionalClasses,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'button',
        {
          [`button_theme_${theme}`]: theme,
        },
        additionalClasses
      )}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}
