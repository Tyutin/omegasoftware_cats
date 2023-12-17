import classNames from 'classnames';
import './Button.scss';

type ButtonProps = {
  clickHandler: () => void;
  theme?: 'orange' | 'blue' | null;
  additionalClasses?: string | string[];
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
};

export default function Button({
  clickHandler,
  theme,
  additionalClasses,
  type,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        'button',
        {
          [`button_theme_${theme}`]: theme,
        },
        additionalClasses
      )}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
