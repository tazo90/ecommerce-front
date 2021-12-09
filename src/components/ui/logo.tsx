import Image from 'next/image';
import cn from 'classnames';

import Link from '@components/ui/link';
import { siteSettings } from '@settings/site.settings';
import React from 'react';

function Logo({ className, ...props }: React.AnchorHTMLAttributes<{}>) {
  return (
    <Link
      href={siteSettings.logo.href}
      className={cn('inline-flex focus:outline-none', className)}
      {...props}
    >
      <Image 
        src={siteSettings.logo.url}
        alt={siteSettings.logo.alt}
        height={siteSettings.logo.height}
        width={siteSettings.logo.width}
        layout="fixed"
        loading="eager"
      />
    </Link>
  ) 
}

export default Logo;
