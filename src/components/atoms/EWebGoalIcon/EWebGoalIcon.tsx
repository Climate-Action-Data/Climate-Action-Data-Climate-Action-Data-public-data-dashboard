import { EWebGoal } from '@/@types/EWebGoal'
import { Image } from '@chakra-ui/react'

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

  switch (goal) {
    case EWebGoal.SDG1:
      return <Image w="40px" h="40px" src={EWebGoal1.src} alt="EWebGoal1" />
    case EWebGoal.SDG2:
      return <Image w="40px" h="40px" src={EWebGoal2.src} alt="EWebGoal2" />
    case EWebGoal.SDG3:
      return <Image w="40px" h="40px" src={EWebGoal3.src} alt="EWebGoal3" />
    case EWebGoal.SDG4:
      return <Image w="40px" h="40px" src={EWebGoal4.src} alt="EWebGoal4" />
    case EWebGoal.SDG5:
      return <Image w="40px" h="40px" src={EWebGoal5.src} alt="EWebGoal5" />
    case EWebGoal.SDG6:
      return <Image w="40px" h="40px" src={EWebGoal6.src} alt="EWebGoal6" />
    case EWebGoal.SDG7:
      return <Image w="40px" h="40px" src={EWebGoal7.src} alt="EWebGoal7" />
    case EWebGoal.SDG8:
      return <Image w="40px" h="40px" src={EWebGoal8.src} alt="EWebGoal8" />
    case EWebGoal.SDG9:
      return <Image w="40px" h="40px" src={EWebGoal9.src} alt="EWebGoal9" />
    case EWebGoal.SDG10:
      return <Image w="40px" h="40px" src={EWebGoal10.src} alt="EWebGoal10" />
    case EWebGoal.SDG11:
      return <Image w="40px" h="40px" src={EWebGoal11.src} alt="EWebGoal11" />
    case EWebGoal.SDG12:
      return <Image w="40px" h="40px" src={EWebGoal12.src} alt="EWebGoal12" />
    case EWebGoal.SDG13:
      return <Image w="40px" h="40px" src={EWebGoal13.src} alt="EWebGoal13" />
    case EWebGoal.SDG14:
      return <Image w="40px" h="40px" src={EWebGoal14.src} alt="EWebGoal14" />
    case EWebGoal.SDG15:
      return <Image w="40px" h="40px" src={EWebGoal15.src} alt="EWebGoal15" />
    case EWebGoal.SDG16:
      return <Image w="40px" h="40px" src={EWebGoal16.src} alt="EWebGoal16" />
    case EWebGoal.SDG17:
      return <Image w="40px" h="40px" src={EWebGoal17.src} alt="EWebGoal17" />
  }
}
