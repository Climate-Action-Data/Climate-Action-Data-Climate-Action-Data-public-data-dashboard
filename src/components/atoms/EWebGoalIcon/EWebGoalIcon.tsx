import { Image } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { EWebGoal } from '@/@types/EWebGoal'

import EWebGoal1 from '@/assets/web-goal/E-WEB-Goal-01.svg'
import EWebGoal2 from '@/assets/web-goal/E-WEB-Goal-02.svg'
import EWebGoal3 from '@/assets/web-goal/E-WEB-Goal-03.svg'
import EWebGoal4 from '@/assets/web-goal/E-WEB-Goal-04.svg'
import EWebGoal5 from '@/assets/web-goal/E-WEB-Goal-05.svg'
import EWebGoal6 from '@/assets/web-goal/E-WEB-Goal-06.svg'
import EWebGoal7 from '@/assets/web-goal/E-WEB-Goal-07.svg'
import EWebGoal8 from '@/assets/web-goal/E-WEB-Goal-08.svg'
import EWebGoal9 from '@/assets/web-goal/E-WEB-Goal-09.svg'
import EWebGoal10 from '@/assets/web-goal/E-WEB-Goal-10.svg'
import EWebGoal11 from '@/assets/web-goal/E-WEB-Goal-11.svg'
import EWebGoal12 from '@/assets/web-goal/E-WEB-Goal-12.svg'
import EWebGoal13 from '@/assets/web-goal/E-WEB-Goal-13.svg'
import EWebGoal14 from '@/assets/web-goal/E-WEB-Goal-14.svg'
import EWebGoal15 from '@/assets/web-goal/E-WEB-Goal-15.svg'
import EWebGoal16 from '@/assets/web-goal/E-WEB-Goal-16.svg'
import EWebGoal17 from '@/assets/web-goal/E-WEB-Goal-17.svg'

interface EWebGoalIconProps {
  goal: EWebGoal
}

export const EWebGoalIcon = (props: EWebGoalIconProps) => {
  const { goal } = props
  const { t } = useTranslation(`projectDetails`)

  const getImageAndText = (goal: EWebGoal) => {
    switch (goal) {
      case EWebGoal.SDG1:
        return [EWebGoal1.src, t(`coBenefits.SDG1`)]
      case EWebGoal.SDG2:
        return [EWebGoal2.src, t(`coBenefits.SDG2`)]
      case EWebGoal.SDG3:
        return [EWebGoal3.src, t(`coBenefits.SDG3`)]
      case EWebGoal.SDG4:
        return [EWebGoal4.src, t(`coBenefits.SDG4`)]
      case EWebGoal.SDG5:
        return [EWebGoal5.src, t(`coBenefits.SDG5`)]
      case EWebGoal.SDG6:
        return [EWebGoal6.src, t(`coBenefits.SDG6`)]
      case EWebGoal.SDG7:
        return [EWebGoal7.src, t(`coBenefits.SDG7`)]
      case EWebGoal.SDG8:
        return [EWebGoal8.src, t(`coBenefits.SDG8`)]
      case EWebGoal.SDG9:
        return [EWebGoal9.src, t(`coBenefits.SDG9`)]
      case EWebGoal.SDG10:
        return [EWebGoal10.src, t(`coBenefits.SDG10`)]
      case EWebGoal.SDG11:
        return [EWebGoal11.src, t(`coBenefits.SDG11`)]
      case EWebGoal.SDG12:
        return [EWebGoal12.src, t(`coBenefits.SDG12`)]
      case EWebGoal.SDG13:
        return [EWebGoal13.src, t(`coBenefits.SDG13`)]
      case EWebGoal.SDG14:
        return [EWebGoal14.src, t(`coBenefits.SDG14`)]
      case EWebGoal.SDG15:
        return [EWebGoal15.src, t(`coBenefits.SDG15`)]
      case EWebGoal.SDG16:
        return [EWebGoal16.src, t(`coBenefits.SDG16`)]
      case EWebGoal.SDG17:
        return [EWebGoal17.src, t(`coBenefits.SDG17`)]
    }
  }

  const [image, altText] = getImageAndText(goal)

  return <Image w="72px" h="72px" src={image} alt={altText} />
}
