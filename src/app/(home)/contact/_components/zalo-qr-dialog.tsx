'use client'

import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface ZaloQRDialogProps {
  onOpenChange: (open: boolean) => void
  open: boolean
  qrImage: string
}

export const ZaloQRDialog = ({
  open,
  onOpenChange,
  qrImage,
}: ZaloQRDialogProps) => (
  <Dialog onOpenChange={onOpenChange} open={open}>
    <DialogContent className='sm:max-w-md'>
      <div className='flex flex-col items-center gap-4'>
        <h2 className='font-semibold text-lg'>Zalo QR Code</h2>
        <Image
          alt='Zalo QR Code'
          className='rounded-lg border border-border'
          height={300}
          src={qrImage}
          width={300}
        />
        <p className='text-center text-muted-foreground text-sm'>
          Scan this QR code to add me on Zalo
        </p>
      </div>
    </DialogContent>
  </Dialog>
)
