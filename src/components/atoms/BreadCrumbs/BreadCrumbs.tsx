import { Link } from '@chakra-ui/next-js'
import { Breadcrumb, BreadcrumbItem, BreadcrumbItemProps } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface BreadCrumbsProps {
  showHome?: boolean
  items: { title: string; link: string; isCurrentPage?: boolean }[]
  color?: string
}

interface BreadCrumbsItemProps extends BreadcrumbItemProps {
  title: string
  link: string
}

const BreadCrumbsItem = (props: BreadCrumbsItemProps) => {
  const { title, link, isCurrentPage } = props
  return (
    <BreadcrumbItem _hover={{ color: `blue.600` }} isCurrentPage={isCurrentPage} {...props}>
      <Link textDecoration={isCurrentPage ? `underline` : `none`} href={link}>
        {title}
      </Link>
    </BreadcrumbItem>
  )
}

const DEFAULT_BREADCRUMB_SEPERATOR = `>`

export const BreadCrumbs = (props: BreadCrumbsProps) => {
  const actualProps: BreadCrumbsProps = {
    ...props,
    showHome: props.showHome ?? true,
    color: props.color ?? `lightGray.200`,
  }

  const currentPath = usePathname()
  const { t } = useTranslation(`home`)
  return (
    <Breadcrumb separator={DEFAULT_BREADCRUMB_SEPERATOR} color={actualProps.color}>
      {actualProps.showHome && (
        <BreadcrumbItem _hover={{ color: `blue.600` }}>
          <Link href="/">{t(`homeBreadcrumb`)}</Link>
        </BreadcrumbItem>
      )}
      {actualProps.items.map((item) => (
        <BreadCrumbsItem key={`breadcrumb-${item.title}`} title={item.title} link={item.link} isCurrentPage={currentPath === item.link} />
      ))}
    </Breadcrumb>
  )
}
