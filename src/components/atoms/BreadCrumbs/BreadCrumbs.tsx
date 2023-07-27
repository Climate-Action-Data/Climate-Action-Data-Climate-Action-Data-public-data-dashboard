import { Link } from '@chakra-ui/next-js'
import { Breadcrumb, BreadcrumbItem, BreadcrumbItemProps } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

interface BreadCrumbsProps {
  showHome?: boolean
  items: { title: string; link: string; isCurrentPage?: boolean }[]
}

interface BreadCrumbsItemProps extends BreadcrumbItemProps {
  title: string
  link: string
}

const BreadCrumbsItem = (props: BreadCrumbsItemProps) => {
  const { title, link, isCurrentPage } = props
  return (
    <BreadcrumbItem _hover={{ color: `blue.600` }} isCurrentPage={isCurrentPage}>
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
  }

  const currentPath = usePathname()

  return (
    <Breadcrumb separator={DEFAULT_BREADCRUMB_SEPERATOR}>
      {actualProps.showHome && (
        <BreadcrumbItem _hover={{ color: `blue.600` }}>
          <Link href="/">Home</Link>
        </BreadcrumbItem>
      )}
      {actualProps.items.map((item) => (
        <BreadCrumbsItem key={`breadcrumb-${item.title}`} title={item.title} link={item.link} isCurrentPage={currentPath === item.link} />
      ))}
    </Breadcrumb>
  )
}
