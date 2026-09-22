"""Per-scope rate throttle classes.

django-ninja's AnonRateThrottle keys its cache bucket by `scope`, so sharing
one class across endpoints would count every API request into a single bucket.
These subclasses give each protected endpoint its own independent bucket:
  - GlobalAnonRateThrottle  → NINJA_DEFAULT_THROTTLE_RATES["anon"]   (300/m)
  - LeadsRateThrottle       → NINJA_DEFAULT_THROTTLE_RATES["leads"]  (10/m)
  - CareersRateThrottle     → NINJA_DEFAULT_THROTTLE_RATES["careers"] (10/m)
"""
from ninja.throttling import AnonRateThrottle


class GlobalAnonRateThrottle(AnonRateThrottle):
    scope = "anon"


class LeadsRateThrottle(AnonRateThrottle):
    scope = "leads"


class CareersRateThrottle(AnonRateThrottle):
    scope = "careers"
