/** NextJs imports */
import NextImage, { ImageProps } from 'next/image';
import cx from 'classnames';

/** Styles */
import './Image.scss';

interface Props extends Omit<ImageProps, 'alt'> {
  alt: string;
}

export default function Image(props: Props) {
  const { className, ...elementProps } = props;

  return (
    <NextImage className={cx('image-component', className)} {...elementProps} />
  );
}
