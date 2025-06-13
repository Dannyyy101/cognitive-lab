import trash from '../../media/trash.svg'
import { ImageIcon } from '@/components/ui/ImageIcon'

interface IconProps {
    className?: string
}

export const TrashIcon = ({ className }: IconProps) => {
    return <ImageIcon className={className} src={trash} alt={'trash-icon'} />
}
