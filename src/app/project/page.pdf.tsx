/* eslint-disable jsx-a11y/alt-text */
import { Page, Text, View, Document, StyleSheet, Image, Svg, Circle, Link, Font, pdf } from '@react-pdf/renderer'
import EWebGoal1 from '@/assets/web-goal/png/E-WEB-Goal-01.png'
import EWebGoal2 from '@/assets/web-goal/png/E-WEB-Goal-02.png'
import EWebGoal3 from '@/assets/web-goal/png/E-WEB-Goal-03.png'
import EWebGoal4 from '@/assets/web-goal/png/E-WEB-Goal-04.png'
import EWebGoal5 from '@/assets/web-goal/png/E-WEB-Goal-05.png'
import EWebGoal6 from '@/assets/web-goal/png/E-WEB-Goal-06.png'
import EWebGoal7 from '@/assets/web-goal/png/E-WEB-Goal-07.png'
import EWebGoal8 from '@/assets/web-goal/png/E-WEB-Goal-08.png'
import EWebGoal9 from '@/assets/web-goal/png/E-WEB-Goal-09.png'
import EWebGoal10 from '@/assets/web-goal/png/E-WEB-Goal-10.png'
import EWebGoal11 from '@/assets/web-goal/png/E-WEB-Goal-11.png'
import EWebGoal12 from '@/assets/web-goal/png/E-WEB-Goal-12.png'
import EWebGoal13 from '@/assets/web-goal/png/E-WEB-Goal-13.png'
import EWebGoal14 from '@/assets/web-goal/png/E-WEB-Goal-14.png'
import EWebGoal15 from '@/assets/web-goal/png/E-WEB-Goal-15.png'
import EWebGoal16 from '@/assets/web-goal/png/E-WEB-Goal-16.png'
import EWebGoal17 from '@/assets/web-goal/png/E-WEB-Goal-17.png'
import { ProjectDetails } from '@/@types/ProjectDetails'
import { DateFormats } from '@/@types/DateFormats'
import { formatDate } from '@/utils/DateFormat'
import { extractEWebGoalFromString, extractProjectTypeFromString, extractTagItemsFromTag } from '@/utils/TextConverter'
import { EWebGoal } from '@/@types/EWebGoal'
import { coordinatesToString, toCoordinates } from '@/utils/UnitConverter'
import { getImage } from '../../components/atoms/ProjectTypeBanner/ProjectTypeBanner'
import saveAs from 'file-saver'
import axios from 'axios'
import { defaultDomain, defaultHeaders } from '../../utils/RequestHelpers'
import { geoDecode } from '@/components/atoms/GoogleMapWidget/GoogleMapWidget'

Font.register({
  family: `Aeonik-Regular`,
  src: `/Aeonik-Regular.woff`,
})

Font.register({
  family: `Aeonik-Medium`,
  src: `/Aeonik-Medium.woff`,
})

Font.register({
  family: `AeonikFono-Regular`,
  src: `/AeonikFono-Regular.woff`,
})

Font.register({
  family: `AeonikFono-Medium`,
  src: `/AeonikFono-Medium.woff`,
})

const maxIssuanceCount = 10
const headerTextColor = `#717D81`
const bodyTextColor = `#00242C`
const outerTextColor = `#4D5C62`
const borderColor = `#4D5C62`
const linkColor = `#0075FF`

const fontSizeXs = 10
const fontSizeSm = 12
const fontSizeMd = 14
const fontSizeLg = 16

const styles = StyleSheet.create({
  body: { padding: 24, backgroundColor: `#F8FAFA`, fontFamily: `Aeonik-Regular`, fontSize: fontSizeXs },
  card: { marginTop: 8, borderRadius: 4, backgroundColor: `#FFFFFF` },
  cardSection: { flexDirection: `row`, marginTop: 2, borderBottom: 0.3, borderBottomColor: `#B8BEC0`, paddingBottom: 8 },
  label: { paddingHorizontal: 8, fontSize: fontSizeXs, color: outerTextColor },
  twoColumnHeader: { width: `50%`, paddingRight: 24, color: headerTextColor },
  twoColumnBody: { width: `50%`, paddingRight: 24, color: bodyTextColor },
  threeColumnHeader: { width: `33%`, paddingRight: 24, color: headerTextColor },
  threeColumnBody: { width: `33%`, paddingRight: 24, color: bodyTextColor },
  fourColumnHeader: { width: `25%`, paddingRight: 24, color: headerTextColor },
  fourColumnBody: { width: `25%`, paddingRight: 24, color: bodyTextColor, fontFamily: `AeonikFono-Regular` },
  lightBottomBorder: { borderBottom: 0.4, borderBottomColor: `#B8BEC0` },
  issuanceTableRow: { height: 29.5, flexDirection: `row`, width: `100%`, paddingVertical: 8, borderBottom: 0.4, borderBottomColor: `#B8BEC0` },
  issuanceTableRowEmpty: { height: 29.5, flexDirection: `row`, width: `100%`, color: outerTextColor, paddingVertical: 8 },
  issuanceTableData: { paddingHorizontal: 8, fontSize: fontSizeXs, height: 16.3, color: outerTextColor, fontFamily: `AeonikFono-Regular` },
  googleMap: { width: 200, height: `100%`, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
})

const noData = `--`

const getCobenefitImage = (goal: EWebGoal) => {
  switch (goal) {
    case EWebGoal.SDG1:
      return EWebGoal1.src
    case EWebGoal.SDG2:
      return EWebGoal2.src
    case EWebGoal.SDG3:
      return EWebGoal3.src
    case EWebGoal.SDG4:
      return EWebGoal4.src
    case EWebGoal.SDG5:
      return EWebGoal5.src
    case EWebGoal.SDG6:
      return EWebGoal6.src
    case EWebGoal.SDG7:
      return EWebGoal7.src
    case EWebGoal.SDG8:
      return EWebGoal8.src
    case EWebGoal.SDG9:
      return EWebGoal9.src
    case EWebGoal.SDG10:
      return EWebGoal10.src
    case EWebGoal.SDG11:
      return EWebGoal11.src
    case EWebGoal.SDG12:
      return EWebGoal12.src
    case EWebGoal.SDG13:
      return EWebGoal13.src
    case EWebGoal.SDG14:
      return EWebGoal14.src
    case EWebGoal.SDG15:
      return EWebGoal15.src
    case EWebGoal.SDG16:
      return EWebGoal16.src
    case EWebGoal.SDG17:
      return EWebGoal17.src
  }
}

const renderVintages = (project: ProjectDetails) => {
  const vintages = project.issuances.map((issuance) => issuance.vintage).sort((a, b) => Number(a) - Number(b))
  if (vintages.length === 0) {
    return noData
  } else if (vintages.length === 1) {
    return `${vintages[0]}`
  } else {
    return `${vintages[0]} - ${vintages[vintages.length - 1]}`
  }
}

const SectionIcon = () => {
  return (
    <Svg viewBox="0 0 40 16" width={24} height={9}>
      <Circle cx="1.42857" cy="1.42857" r="1.42857" fill="#2DEC7C"></Circle>
      <Circle cx="1.42857" cy="13.8097" r="1.42857" fill="#2DEC7C"></Circle>
      <Circle cx="13.8094" cy="1.42857" r="1.42857" fill="#2DEC7C"></Circle>
      <Circle cx="13.8094" cy="13.8097" r="1.42857" fill="#2DEC7C"></Circle>
      <Circle cx="26.1903" cy="1.42857" r="1.42857" fill="#2DEC7C"></Circle>
      <Circle cx="26.1903" cy="13.8097" r="1.42857" fill="#2DEC7C"></Circle>
      <Circle cx="38.5716" cy="1.42857" r="1.42857" fill="#2DEC7C"></Circle>
      <Circle cx="38.5716" cy="13.8097" r="1.42857" fill="#2DEC7C"></Circle>
    </Svg>
  )
}

const buildRow = (data: string[], rowStyle: any, itemStyle: any) => {
  return (
    <View style={rowStyle} wrap={false}>
      {data.map((item) => {
        return (
          <Text key={item} style={itemStyle}>
            {item ?? noData}
          </Text>
        )
      })}
    </View>
  )
}

const buildDescription = (description: string) => {
  return (
    <View>
      <Text style={{ fontSize: fontSizeSm, paddingTop: 16, fontWeight: 400 }}>Description</Text>
      <Text style={{ fontSize: fontSizeXs, paddingTop: 8, fontWeight: 400, color: outerTextColor }}>{description}</Text>
    </View>
  )
}

const buildSection = (title: string) => {
  return (
    <View style={{ flexDirection: `row`, marginTop: 16, alignItems: `center`, height: 40 }}>
      <SectionIcon />
      <Text style={{ fontSize: fontSizeMd, marginLeft: 8, fontWeight: 500, color: bodyTextColor, fontFamily: `AeonikFono-Medium` }}>{title}</Text>
    </View>
  )
}

const buildProjectBanner = (project: ProjectDetails) => {
  return (
    <View style={{ position: `relative` }}>
      <Image src={getImage(extractProjectTypeFromString(project.type))} style={{ width: 547, borderRadius: 8 }} />
      <View style={{ position: `absolute`, bottom: 0, padding: 10, backgroundColor: `#00000060`, width: `100%`, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
        <Text style={{ fontSize: fontSizeXs, color: `white` }}>{project.id}</Text>
        <Text style={{ fontSize: fontSizeLg, color: `white`, paddingVertical: 4 }}>{project.name}</Text>
        <Text style={{ fontSize: fontSizeXs, color: `white` }}>{project.developer}</Text>
      </View>
    </View>
  )
}

interface GeneratePdfProps {
  id?: string
  projectDetails?: ProjectDetails
}

export const generateProjectPDFDocument = async (props: GeneratePdfProps) => {
  const { id, projectDetails } = props
  if (!projectDetails && !id) {
    return
  }

  let project = projectDetails

  if (id) {
    const projectResponse = await getProject(id)

    if (!projectResponse) {
      return
    }
    project = projectResponse
  }
  if (!project) {
    return
  }

  const initPdf = await projectDetailsPdf(project)
  const projectPdf = pdf(initPdf)

  const result = await projectPdf.toBlob()
  saveAs(result, `${project?.name}.pdf`)
}

const renderCreditingPeriod = (start: string, end: string) => {
  if (!start || !end) {
    return noData
  }
  const startDate = formatDate(start, DateFormats.YYYY_MM_DD)
  const endDate = formatDate(end, DateFormats.YYYY_MM_DD)
  return `${startDate} - ${endDate}`
}

const projectDetailsPdf = async (project: ProjectDetails) => {
  const coordinates = project?.location ? toCoordinates(project?.location.geoCoordinates) ?? project?.location.country : undefined
  const geoCode = coordinates ? await geoDecode(coordinates) : undefined
  const geoCodeFormatted = geoCode ? coordinatesToString(toCoordinates(project?.location.geoCoordinates)) : noData

  const projectLink = `${window.location.origin}/project?id=${project.warehouseProjectId}`

  return (
    <Document>
      <Page size="A4" style={styles.body} wrap>
        {buildProjectBanner(project)}
        {buildDescription(project.description)}
        {buildSection(`Project Details`)}

        <View style={{ marginTop: 4, paddingHorizontal: 8, paddingVertical: 16, borderRadius: 4, backgroundColor: `#FFFFFF` }}>
          {buildRow([`Standard`, `Methodology`, `Project Developer`], { flexDirection: `row` }, styles.threeColumnHeader)}
          {buildRow([project.standard, project.methodology, project.developer], { flexDirection: `row`, marginTop: 2 }, styles.threeColumnBody)}

          {buildRow([`Sector`, `Project Type`, `Project Link`], { flexDirection: `row`, marginTop: 16 }, styles.threeColumnHeader)}
          <View style={styles.cardSection}>
            <Text style={styles.threeColumnBody}>{project.sector}</Text>
            <Text style={styles.threeColumnBody}>{project.type}</Text>
            <Link style={{ fontSize: fontSizeXs, width: 170, color: linkColor }} src={project.link}>
              {project.link}
            </Link>
          </View>

          {buildRow([`Status`, `Status Updated On`], { flexDirection: `row`, marginTop: 8 }, styles.twoColumnHeader)}
          {buildRow(
            [project.status, project.statusDate ? formatDate(project.statusDate, DateFormats.YYYY_MM_DD) : noData],
            { flexDirection: `row`, marginTop: 2 },
            styles.twoColumnBody,
          )}

          {buildRow([`Validation Body`, `Validation Date`], { flexDirection: `row`, marginTop: 16 }, styles.twoColumnHeader)}
          <View style={styles.cardSection}>
            <Text style={styles.twoColumnBody}>{project.validation.body}</Text>
            <Text style={{ ...styles.twoColumnBody, fontFamily: `AeonikFono-Regular` }}>
              {project.validation.date ? formatDate(project.validation.date, DateFormats.YYYY_MM_DD) : noData}
            </Text>
          </View>

          {buildRow([`Total Available Units`, `Total Issuances`, `Total Retirements`, `Annual Estimated Units`], { flexDirection: `row`, marginTop: 8 }, styles.fourColumnHeader)}
          {buildRow(
            [project.units.available.toLocaleString(), project.units.issued.toLocaleString(), project.units.retired.toLocaleString(), project.units.estimated.toLocaleString()],
            { flexDirection: `row`, marginTop: 2 },
            { ...styles.fourColumnBody, fontFamily: `AeonikFono-Regular` },
          )}

          {buildRow([`Crediting Period`, `Unit Metric Measurement`], { flexDirection: `row`, marginTop: 16 }, styles.twoColumnHeader)}
          {buildRow(
            [renderCreditingPeriod(project.units.creditingPeriodStart, project.units.creditingPeriodEnd), project.units.unitMetric],
            styles.cardSection,
            styles.twoColumnBody,
          )}

          <View wrap={false}>
            <View style={{ flexDirection: `row`, marginTop: 8 }}>
              <Text style={{ fontSize: fontSizeXs, width: 128, color: headerTextColor }}>NDC Coverage</Text>
              <Text style={{ fontSize: fontSizeXs, width: 400, color: headerTextColor }}>Co-Benefits</Text>
            </View>
            <View style={styles.cardSection} wrap={false}>
              <Text style={{ fontSize: fontSizeXs, width: 128, color: bodyTextColor }}>{project.coveredByNdc}</Text>
              <View style={{ width: 400, flexDirection: `row`, flexWrap: `wrap` }}>
                {project.coBenefits.map((benefit) => {
                  const eWebGoal = extractEWebGoalFromString(benefit)
                  if (eWebGoal) {
                    return <Image key={benefit} src={getCobenefitImage(eWebGoal)} style={{ width: 40, height: 40, padding: 1 }} />
                  }
                })}
              </View>
            </View>
          </View>

          <View style={{ flexDirection: `column`, marginTop: 8 }} wrap={false}>
            <Text style={{ fontSize: fontSizeXs, color: headerTextColor }}>Project Tags</Text>
            <Text style={{ fontSize: fontSizeXs, color: bodyTextColor, marginTop: 2 }}>{extractTagItemsFromTag(project.tags)}</Text>
          </View>
        </View>

        <View style={{ ...styles.card, flexDirection: `row`, height: 140 }} wrap={false}>
          <View style={{ width: 380, padding: 8 }}>
            {buildRow([`Country`, `In-country Region`], { flexDirection: `row`, marginTop: 8 }, { fontSize: fontSizeXs, width: 163, color: headerTextColor })}
            {buildRow([project.location.country, project.location.region], { flexDirection: `row`, marginTop: 2 }, { fontSize: fontSizeXs, width: 163, color: bodyTextColor })}
            <View style={{ flexDirection: `column`, marginTop: 20 }}>
              <Text style={{ fontSize: fontSizeXs, width: 163, color: headerTextColor }}>Geographic identifier</Text>
              <Text style={{ fontSize: fontSizeXs, width: 163, color: bodyTextColor, marginTop: 2 }}>{geoCodeFormatted}</Text>
            </View>
          </View>
          {geoCode ? (
            <Link src={`https://maps.google.com/maps?q=${geoCode.lat},${geoCode.lng}&z=10`}>
              <Image
                style={styles.googleMap}
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${geoCode.lat},${geoCode.lng}&zoom=8&scale=2&size=360x280&markers=${geoCode.lat},${geoCode.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
              />
            </Link>
          ) : (
            <View style={{ position: `relative` }}>
              <Image
                style={styles.googleMap}
                src={`https://maps.googleapis.com/maps/api/staticmap?zoom=1&markers=color:blue&size=500x250&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
              />
              <View
                style={{
                  position: `absolute`,
                  justifyContent: `center`,
                  alignItems: `center`,
                  backgroundColor: `#DBDEE0CC`,
                  height: `100%`,
                  width: 200,
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                }}
              >
                <Text style={{ fontSize: fontSizeXs, color: `white`, width: 100, textAlign: `center` }}>
                  This project location is currently unavailable within the carbon registries
                </Text>
              </View>
            </View>
          )}
        </View>

        {buildSection(`Issuances & Retirements`)}

        <View style={{ ...styles.card, paddingHorizontal: 8, paddingVertical: 16 }} wrap={false}>
          {buildRow([`Total Available Units`, `Available Vintages`], { flexDirection: `row` }, { fontSize: fontSizeXs, width: 265, color: headerTextColor })}
          {buildRow(
            [project.units.available.toLocaleString() ?? noData, renderVintages(project)],
            { flexDirection: `row`, marginTop: 2 },
            { fontSize: fontSizeXs, width: 265, color: bodyTextColor },
          )}
        </View>

        <View style={{ ...styles.card, marginTop: 16 }}>
          <View style={{ borderBottom: 0.82, paddingVertical: 12, borderBottomColor: borderColor }}>
            <Text style={{ ...styles.label, color: outerTextColor }}>To access the complete list of issuances and retirements, please visit</Text>
            <Link style={{ ...styles.label, color: linkColor }} src={projectLink}>
              {projectLink}
            </Link>
          </View>
          <View style={{ marginVertical: 3.5, borderBottom: 0.82, borderBottomColor: borderColor }}>
            <Text style={{ ...styles.label, paddingVertical: 6.54, fontWeight: 500, color: outerTextColor }}>ISSUANCES</Text>
          </View>
          <View style={{ marginTop: 20, paddingBottom: 8, borderBottom: 0.82, borderBottomColor: borderColor, flexDirection: `row`, width: `100%` }}>
            <Text style={{ ...styles.label, width: 88 }}>Vintage</Text>
            <Text style={{ ...styles.label, width: 120 }}>Quantity</Text>
            <Text style={{ ...styles.label, width: 120 }}>Units Available</Text>
            <Text style={{ ...styles.label, width: 131 }}>Verification Report Date</Text>
          </View>

          {project.issuances.length == 0 && (
            <View style={{ height: 50, alignItems: `center`, justifyContent: `center` }}>
              <Text style={{ color: outerTextColor }}>No issuances</Text>
            </View>
          )}

          {project.issuances.slice(0, maxIssuanceCount).map((issuance, index) => {
            const isLastItem = index === maxIssuanceCount - 1 || index === (project?.issuances.length ?? 0) - 1
            return (
              <View key={issuance.id} style={{ ...(isLastItem ? styles.issuanceTableRowEmpty : styles.issuanceTableRow) }}>
                <Text style={{ ...styles.issuanceTableData, width: 88 }}>{issuance.vintage}</Text>
                <Text style={{ ...styles.issuanceTableData, width: 120 }}>{issuance.quantity.toLocaleString()}</Text>
                <Text style={{ ...styles.issuanceTableData, width: 120 }}>{issuance.availableUnits.toLocaleString()}</Text>
                <Text style={{ ...styles.issuanceTableData, width: 131 }}>{formatDate(issuance.date, DateFormats.YYYY_MM_DD)}</Text>
              </View>
            )
          })}
        </View>
      </Page>
    </Document>
  )
}

const getProject = async (projectId: string): Promise<ProjectDetails | undefined> => {
  return new Promise((resolve) => {
    axios
      .get(`${defaultDomain}/v1/projects/${projectId}`, defaultHeaders)
      .then((body) => {
        if (body.data) {
          const projectData = body.data as ProjectDetails
          resolve(projectData)
        }
      })
      .catch((error) => {
        resolve(undefined)
      })
      .finally(() => {
        resolve(undefined)
      })
  })
}
