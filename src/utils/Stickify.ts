export const shouldReposition = (toReposition: Element, repositionRef: Element, headerRef: Element, multiScroll: Element) => {
  const hasClass = toReposition.classList.contains(`fixed`)
  if (!hasClass) {
    const toRepositionBound = toReposition.getBoundingClientRect()
    const headerRedBound = headerRef.getBoundingClientRect()
    if (toRepositionBound.bottom < headerRedBound.bottom) {
      toReposition.classList.add(`fixed`)
      setScroll(repositionRef, toReposition)
    }
  } else {
    const toRepositionBound = toReposition.getBoundingClientRect()
    const repositionRedBound = repositionRef.getBoundingClientRect()
    if (repositionRedBound.top === toRepositionBound.top || repositionRedBound.top > toRepositionBound.top) {
      toReposition.classList.remove(`fixed`)
      repositionRef.scrollLeft = multiScroll.scrollLeft
    }
  }
}

export const setScroll = (toScroll: Element, fixedElement: Element, multiScrollClass = `#multiScroll`) => {
  const multiScroll = document.querySelector(multiScrollClass)
  if (multiScroll) {
    if (fixedElement.classList.contains(`fixed`)) {
      const trList = fixedElement.children
      if (trList.item(0)) {
        const tr = trList.item(0)
        if (tr) {
          tr.scrollLeft = multiScroll.scrollLeft
        }
      }
    } else {
      toScroll.scrollLeft = multiScroll.scrollLeft
    }
  }
}
export const changeHoverColor = (classNameToHover: string, classNameToAdd: string) => {
  const formattedClassName = `.${classNameToHover}`

  const elementsToChange = document.querySelectorAll(formattedClassName)
  if (elementsToChange) {
    elementsToChange.forEach((row) => {
      row.classList.add(classNameToAdd)
      row.addEventListener(`mouseleave`, () => {
        elementsToChange.forEach((row) => {
          row.classList.remove(classNameToAdd)
        })
      })
    })
  }
}
