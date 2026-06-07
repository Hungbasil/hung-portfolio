'use client'

import { useState } from 'react'
import { Icons } from '@/components/icons/icons'
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionHeader,
  SplitSectionSidebar,
} from '@/components/sections/split-section'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ViewAnimation } from '@/components/view-animation'
import { WorkExperience } from '@/components/work-experience'
import { experiences } from '@/constants/portfolio/experiences'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Experience(): React.ReactElement {
  const [showDialog, setShowDialog] = useState(false)
  const isMobile = useIsMobile()

  const handleResumeClick = () => {
    if (isMobile) {
      window.open('/Nguyen_Khai_Hung_CV.pdf', '_blank')
    } else {
      setShowDialog(true)
    }
  }

  const handleViewOnly = () => {
    setShowDialog(false)
    window.open('/Nguyen_Khai_Hung_CV.pdf', '_blank')
  }

  const handleDownload = () => {
    setShowDialog(false)
    window.open('/Nguyen_Khai_Hung_CV.pdf', '_blank')
    const link = document.createElement('a')
    link.href = '/Nguyen_Khai_Hung_CV.pdf'
    link.download = 'Nguyen_Khai_Hung_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <SplitSection cols='three'>
        <SplitSectionSidebar background='dashed'>
          <SplitSectionHeader
            description='Here is my  resume and a quick look at my work experience'
            sticky
            title='Experience'
          >
            <ViewAnimation
              delay={0.15}
              initial={{ opacity: 0, translateY: -6 }}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              <Button
                className='w-fit'
                onClick={handleResumeClick}
                size='sm'
                variant='default'
              >
                Resume
                <Icons.download className='inline-block' />
              </Button>
            </ViewAnimation>
          </SplitSectionHeader>
        </SplitSectionSidebar>

        <SplitSectionContent className='px-0 py-0 lg:col-span-2'>
          <ViewAnimation
            initial={{ opacity: 0, translateY: -6 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <WorkExperience experiences={experiences} />
          </ViewAnimation>
        </SplitSectionContent>
      </SplitSection>

      <AlertDialog onOpenChange={setShowDialog} open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>My CV</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to view it directly or download it to your device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='gap-2 sm:gap-2'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              className='w-full sm:w-auto'
              onClick={handleViewOnly}
              size='sm'
              variant='outline'
            >
              View
            </Button>
            <AlertDialogAction onClick={handleDownload}>
              Download
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
