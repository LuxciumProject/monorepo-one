-- 1. DEFINE STRUCTURAL ELEMENTS
structure HeadingLevel where
  depth : Nat
  deriving BEq, DecidableEq, Repr

namespace HeadingLevel
  def h1 : HeadingLevel := ⟨1⟩
  def h2 : HeadingLevel := ⟨2⟩
  def h3 : HeadingLevel := ⟨3⟩
  def h4 : HeadingLevel := ⟨4⟩
end HeadingLevel

structure Block where
  level : HeadingLevel
  title : String
  body  : String
  deriving Repr

-- 2. THE TRANSITION MATRIX (The core logic gates)
def isValidTransition (current next : Block) : Bool :=
  -- Rule A: Escalation (Deepen by exactly 1 level. e.g., H1 -> H2, or H2 -> H3)
  (next.level.depth == current.level.depth + 1) || 
  -- Rule B: Flattening (Return to a sibling or shallower level, but never back to H1)
  (next.level.depth <= current.level.depth && next.level.depth > 1)

-- 3. SEQUENTIAL CHAIN VALIDATION
def validChain : List Block → Bool
  | [] => true
  | [_] => true
  | b1 :: b2 :: bs => isValidTransition b1 b2 && validChain (b2 :: bs)

-- 4. GLOBAL DOCUMENT INVARIANTS
def isValidDocument (doc : List Block) : Bool :=
  match doc with
  | [] => false -- Banned: Empty document
  | first :: remainder => 
      -- Critical Rule: Must start with H1, followed by a valid structural chain
      (first.level.depth == 1) && validChain (first :: remainder)

-- 5. THE DEPENDENT TYPE GUARD
-- This structure demands a proof that the layout is true.
structure CertifiedDocument where
  content : List Block
  is_valid : isValidDocument content = true
  deriving Repr

-- 6. SUCCESS CONTROL CASE
def perfectDoc : List Block := [
  ⟨HeadingLevel.h1, "Document Title", "Mandatory single H1 intro paragraph."⟩,
  ⟨HeadingLevel.h2, "First Heading 2", "First paragraph of the H2 section."⟩,
  ⟨HeadingLevel.h3, "First Heading 3", "Second paragraph escalated to H3."⟩,
  ⟨HeadingLevel.h4, "First Heading 4", "Third paragraph escalated to H4."⟩,
  -- We now close the subsections and open a brand new H2 section safely:
  ⟨HeadingLevel.h2, "Second Heading 2", "A completely fresh H2 section starts here."⟩
]

-- THIS COMPILES WITHOUT ERROR
def certifiedGood : CertifiedDocument := 
  ⟨perfectDoc, by rfl⟩