import trash from '../../media/trash.svg'
import x from '../../media/x.svg'
import xRed from '../../media/xRed.svg'
import check from '../../media/check.svg'
import checkGreen from '../../media/checkGreen.svg'
import { ImageIcon } from '@/components/ui/ImageIcon'

interface IconProps {
    className?: string
}

export const TrashIcon = ({ className }: IconProps) => {
    return <ImageIcon className={className} src={trash} alt={'trash-icon'} />
}

export const XIcon = ({ className }: IconProps) => {
    return <ImageIcon className={className} src={x} alt={'x-icon'} />
}

export const XIconRed = ({ className }: IconProps) => {
    return <ImageIcon className={className} src={xRed} alt={'x-icon-red'} />
}

export const CheckIconGreen = ({ className }: IconProps) => {
    return <ImageIcon className={className} src={checkGreen} alt={'check-icon-green'} />
}

export const CheckIcon = ({ className }: IconProps) => {
    return <ImageIcon className={className} src={check} alt={'check-icon'} />
}
