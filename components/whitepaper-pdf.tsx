"use client"
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer"
import { saveAs } from "file-saver"

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#ff00aa",
    textAlign: "center",
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#00e5ff",
  },
  section: {
    margin: 10,
    padding: 10,
    borderLeft: "2px solid #ff00aa",
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.5,
  },
  strong: {
    color: "#ff00aa",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: "center",
    color: "#666666",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bullet: {
    width: 10,
    fontSize: 12,
  },
  listItemContent: {
    flex: 1,
    fontSize: 12,
  },
  code: {
    fontSize: 10,
    backgroundColor: "#111111",
    padding: 10,
    marginVertical: 10,
    color: "#00e5ff",
  },
  divider: {
    borderBottom: "1px solid #333333",
    marginVertical: 15,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: "#666666",
  },
})

// Create Document Component
const WhitepaperPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>$BLKBOX WHITEPAPER</Text>
      <Text style={[styles.text, { textAlign: "center", color: "#00e5ff", marginBottom: 20 }]}>
        THE SHADOW PROTOCOL
      </Text>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.subheader}>1. INTRODUCTION</Text>
        <Text style={styles.text}>
          $BLKBOX represents a paradigm shift in the Solana ecosystem. It's not merely a token; it's a complete system
          designed to level the playing field between retail traders and institutional players who have long dominated
          the market with proprietary tools and privileged access.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>2. MARKET PROBLEM</Text>
        <Text style={styles.text}>
          The cryptocurrency market suffers from significant information asymmetry. While retail investors are limited
          to public interfaces and basic tools, institutional players leverage sophisticated algorithms, high-frequency
          trading systems, and privileged network access to extract value from the market at the expense of average
          participants.
        </Text>
        <Text style={styles.text}>
          This asymmetry is particularly acute in the Solana ecosystem, where the high throughput and low transaction
          costs create opportunities for MEV extraction, front-running, and other advanced trading strategies that are
          typically inaccessible to retail traders.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>3. THE $BLKBOX SOLUTION</Text>
        <Text style={styles.text}>
          $BLKBOX democratizes access to institutional-grade trading tools and strategies through a token-gated access
          model. By holding $BLKBOX tokens, users gain access to a suite of tools that were previously available only to
          insiders and large trading firms.
        </Text>

        <Text style={[styles.text, { fontWeight: "bold", marginTop: 10 }]}>3.1 Core Components</Text>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <View style={styles.listItemContent}>
            <Text>
              <Text style={styles.strong}>Stealth MEV Extraction: </Text>
              Algorithms that identify and capture Maximal Extractable Value before others can see the opportunity.
            </Text>
          </View>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <View style={styles.listItemContent}>
            <Text>
              <Text style={styles.strong}>Shadow Swap System: </Text>
              Transaction routing through obfuscation layers to hide trading intent and minimize slippage.
            </Text>
          </View>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <View style={styles.listItemContent}>
            <Text>
              <Text style={styles.strong}>Predictive Liquidation Engine: </Text>
              AI-powered system to identify vulnerable positions before they collapse.
            </Text>
          </View>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <View style={styles.listItemContent}>
            <Text>
              <Text style={styles.strong}>Whale Intelligence Network: </Text>
              Real-time tracking of significant market movers and their transaction patterns.
            </Text>
          </View>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <View style={styles.listItemContent}>
            <Text>
              <Text style={styles.strong}>AI Strategy Lab: </Text>
              Custom trading algorithm generation based on individual risk profiles.
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.subheader}>4. TOKENOMICS</Text>

        <Text style={[styles.text, { fontWeight: "bold", marginTop: 10 }]}>4.1 Token Distribution</Text>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>30% Community Sale</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>20% Development Fund (3-year linear vesting)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>15% Liquidity Pool (locked for 2 years)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>15% Marketing & Partnerships</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>10% Team (1-year cliff, 3-year vesting)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>10% Future Shadow Operations</Text>
        </View>

        <Text style={[styles.text, { fontWeight: "bold", marginTop: 10 }]}>4.2 Tax Structure</Text>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>3% Buy Tax (2% USDC Dividends, 1% Treasury)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>5% Sell Tax (3% USDC Dividends, 2% Auto-LP)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>0% Transfer Tax Between Holders</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>5. ACCESS TIERS</Text>
        <Text style={styles.text}>$BLKBOX implements a tiered access system based on token holdings:</Text>

        <Text style={styles.code}>
          // Access tier calculation{"\n"}
          function calculateTier(holdings) {"{" + "\n"}
          {"  "}if (holdings &gt;= 1000000) return "PHANTOM_COUNCIL";{"\n"}
          {"  "}if (holdings &gt;= 250000) return "SHADOW_ELITE";{"\n"}
          {"  "}if (holdings &gt;= 50000) return "OPERATOR";{"\n"}
          {"  "}if (holdings &gt;= 10000) return "ENTRY_LEVEL";{"\n"}
          {"  "}return "UNAUTHORIZED";{"\n"}
          {"}"}
        </Text>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <View style={styles.listItemContent}>
            <Text>
              <Text style={styles.strong}>Entry Level (10,000 $BLKBOX): </Text>
              Basic toolkit access, manual execution, weekly USDC dividends
            </Text>
          </View>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <View style={styles.listItemContent}>
            <Text>
              <Text style={styles.strong}>Operator (50,000 $BLKBOX): </Text>
              Advanced features, semi-automated strategies, higher dividend rate
            </Text>
          </View>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <View style={styles.listItemContent}>
            <Text>
              <Text style={styles.strong}>Shadow Elite (250,000 $BLKBOX): </Text>
              Full arsenal access, priority execution, custom AI agents
            </Text>
          </View>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <View style={styles.listItemContent}>
            <Text>
              <Text style={styles.strong}>Phantom Council (1,000,000+ $BLKBOX): </Text>
              Governance rights, alpha group access, direct developer line
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.subheader}>6. DIVIDEND MECHANISM</Text>
        <Text style={styles.text}>$BLKBOX implements an automated USDC dividend distribution system:</Text>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>2% of all swap volume captured for dividend pool</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>5% of all profitable MEV extraction distributed to holders</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>10% of subscription revenue converted to USDC dividends</Text>
        </View>

        <Text style={styles.text}>
          Dividends are distributed weekly directly to holder wallets with no staking or claiming required.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>7. ROADMAP</Text>

        <Text style={[styles.text, { fontWeight: "bold", marginTop: 10 }]}>Phase 1: Genesis</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>Token launch</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>Initial tool suite deployment</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>First dividend distribution</Text>
        </View>

        <Text style={[styles.text, { fontWeight: "bold", marginTop: 10 }]}>Phase 2: Expansion</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>AI Strategy Lab release</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>Advanced MEV extraction algorithms</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>Whale Intelligence Network expansion</Text>
        </View>

        <Text style={[styles.text, { fontWeight: "bold", marginTop: 10 }]}>Phase 3: Evolution</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>Cross-chain expansion</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>Institutional partnerships</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>• </Text>
          <Text style={styles.listItemContent}>Governance system activation</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>8. CONCLUSION</Text>
        <Text style={styles.text}>
          $BLKBOX represents a new paradigm in DeFi - one where sophisticated trading tools are not the exclusive domain
          of insiders and institutions. By democratizing access to these tools and creating a sustainable economic model
          through dividends, $BLKBOX aims to level the playing field and create a more equitable trading environment for
          all participants.
        </Text>
        <Text style={styles.text}>
          This is not just another token. This is warfare against a system designed to keep you on the outside. The time
          has come to step into the shadows.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 $BLKBOX. All rights reserved.</Text>
      </View>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>
  </Document>
)

// Function to generate and download PDF
export const generatePDF = async () => {
  try {
    const blob = await pdf(<WhitepaperPDF />).toBlob()
    saveAs(blob, "BLKBOX_Whitepaper.pdf")
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}

export default WhitepaperPDF
