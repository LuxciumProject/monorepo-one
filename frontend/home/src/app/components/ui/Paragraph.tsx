import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

const paragraphVariants = cva(
  'max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center',
  {
    variants: {
      size: {
        default: 'text-base sm:text-lg',
        sm: 'text-base sm:text-lg',
      },
    },
    defaultVariants: { size: 'default' },
  }
);

interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph: FC<ParagraphProps> = ({}) => {
  return <div>Paragraph</div>;
};

export default Paragraph;
