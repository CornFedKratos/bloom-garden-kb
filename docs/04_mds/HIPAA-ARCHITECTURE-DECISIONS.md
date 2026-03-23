# HIPAA Architecture Decisions
**Status:** Constitutional — requires Orchestrator + Legal review to modify
**Date Established:** 2026-03-22

---

## Governing Principle
HIPAA compliance is architectural, not additive. Every data, authentication, and infrastructure decision is made with HIPAA compliance as a baseline requirement, not a retrofit.

---

## Data Classification Register

| Data Type | Classification | Storage | Access |
|---|---|---|---|
| Child emotional check-ins | PHI | Encrypted at rest + in transit | Parent, linked OT, audit log |
| Mini-game behavioral signals | PHI | Encrypted at rest + in transit | Parent, linked OT, audit log |
| OT clinical notes | PHI — highest tier | Encrypted, strictest controls | Linked OT only + parent visibility |
| Exercise prescription data | PHI | Encrypted at rest + in transit | Parent, linked OT |
| Garden Mail messages | PHI | Encrypted, full audit trail | OT author, parent always |
| Companion name/preferences | PII (not PHI) | Encrypted | Parent, child session |
| Parent account info | PII | Standard security | Parent only |
| Anonymous aggregate data | Neither | Standard | Product analytics only |

---

## Architecture Requirements

### Encryption
- All PHI encrypted at rest using AES-256 minimum
- All PHI encrypted in transit using TLS 1.3 minimum
- Encryption keys managed separately from data — not co-located

### Audit Logging
- Every access to any PHI record logged: timestamp, user ID, role, action, record accessed
- Audit logs are immutable — append only, no modification or deletion
- Audit logs retained minimum 6 years per HIPAA requirement
- Audit log access restricted to compliance review only

### Role-Based Access Control
Three strictly separated access lanes:

**Child lane** — access to own garden experience only, no PHI access, all mediated through parent account

**Parent lane** — access to own child's PHI only, no access to OT clinical notes content, can see OT-to-child Garden Mail

**OT lane** — access to linked children only, no cross-contamination between caseloads, all clinical notes scoped to individual child

### Business Associate Agreements
Every vendor that touches PHI requires a signed BAA before any PHI enters their system.

Current vendor BAA status:
- Supabase: BAA available on paid plan — REQUIRED before launch
- Any CDN or file storage service: BAA required if PHI passes through
- Any analytics or monitoring service: PHI must not enter — anonymization required at source

### Data Residency
All PHI must remain within the United States. No CDN routing, no third-party service, no infrastructure component may route or store PHI outside US jurisdiction.

### Breach Notification Protocol
Defined before launch:
- Internal detection and assessment: 24 hours
- Orchestrator notification: immediate upon detection
- HHS notification: within 60 days of discovery per HIPAA requirement
- Affected individual notification: without unreasonable delay, within 60 days
- Written breach response procedure maintained in compliance documentation

### Minimum Necessary Standard
Every data point collected requires a documented, justified clinical or operational purpose. Data collection without a defined use case is prohibited. Data collected for one purpose may not be repurposed without re-evaluation.

---

## Authentication Architecture

### Parent Account
- Email + password with minimum complexity requirements
- Optional biometric authentication (device-native)
- Session timeout: 30 minutes of inactivity on web, configurable on mobile
- Multi-factor authentication available, recommended but not mandated at launch

### Child Access
- No independent child credentials
- Child access mediated entirely through parent account
- Parent creates and manages child profile
- Device-level PIN or biometric for child session access (parent configures)

### OT Portal
- Professional email verification required
- License number validation — implementation TBD with pilot OT group
- Mandatory session timeout: 15 minutes inactivity
- No shared OT accounts — individual credentials per practitioner
- Practice admin tier (post-MVP) adds team management layer

### Invite Code System
- Parent generates invite code to link OT to child profile
- Codes are single-use and time-limited (72 hours)
- Parent can revoke OT access at any time
- Access revocation takes effect immediately

---

## Supabase Configuration Requirements

Before any PHI enters the Supabase instance:
- [ ] Paid plan active (BAA prerequisite)
- [ ] BAA signed with Supabase
- [ ] Row-level security enabled on ALL tables containing PHI
- [ ] RLS policies reviewed by Orchestrator before activation
- [ ] Encryption at rest confirmed in project settings
- [ ] Audit logging configured
- [ ] Database access restricted — no direct database credentials in any agent or client code
- [ ] Service role key stored in secure secrets management only — never in code, never in chat

---

## COPPA Requirements

All children under 13:
- Parental consent required before any account creation for a child
- Parental gate on all settings modifications
- No child-facing advertising of any kind
- No behavioral advertising
- No sharing of child data with third parties for commercial purposes
- Parent can request deletion of all child data at any time
- Data deletion must be complete and verifiable

---

## What This Means for Development

Every Codey and Codey Jr ticket that touches data must answer:
1. Does this create, read, update, or delete PHI?
2. If yes, is RLS policy in place for this table?
3. Is this access logged in the audit trail?
4. Is the data encrypted at rest and in transit?
5. Is the minimum necessary standard satisfied?

If any answer is no — stop and resolve before implementing.

---

*HIPAA compliance is not a feature. It is the foundation. Everything is built on top of it.*
