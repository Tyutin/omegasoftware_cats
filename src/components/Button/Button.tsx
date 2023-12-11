import classNames from 'classnames';
import './Button.scss';

type ButtonProps = {
  text: string;
  clickHandler: () => void;
  theme?: 'orange' | 'blue' | null;
  additionalClasses?: string | string[];
};

export default function Button(props: ButtonProps) {
  const { text, clickHandler, theme, additionalClasses } = props;
  const classes = Array.isArray(additionalClasses)
    ? additionalClasses.join(' ')
    : !!additionalClasses
    ? additionalClasses
    : '';
  return (
    <button
      className={classNames(
        'button',
        theme ? `button_theme_${theme}` : '',
        classes
      )}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}
