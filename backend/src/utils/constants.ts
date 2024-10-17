// DEFINE APP CONSTANT VARIABLES HERE

export const ROLES = {
    super_admin: 'super_admin',
    admin: 'admin',
    rider: 'rider',
    driver: 'driver',
    guest: 'guest',
    developer: 'developer',
    support: 'support',
};

export const TOKEN_TYPE = {
    email: 'email', // for email verification
    password: 'password', // for password reset
    login: 'login', // for login
    invite: 'invite', // for admininvite
    passphrase: 'passphrase', // for passphrase reset
    pin: 'pin', // for pin reset
};

export const ACCOUNT_TYPE = {
    individual: 'Individual',
    organization: 'Organisation',
};

export const ORGANISATION_SIZE = {
    small: 'Small (1-10 employees)',
    medium: 'Medium (11-50 employees)',
    large: 'Large (51-200 employees)',
    enterprise: '201+ employees',
};

export const OPERATIONAL_SCOPE = {
    local: 'Local',
    statewide: 'Statewide',
    regional: 'Regional',
    worldwide: 'Worldwide',
};

export const ORGANISATION_CLASSIFICATION = {
    company: 'Company',
    goverment_agency: 'Government Agency',
    hospital_industry: 'Hospital Industry',
    diplomatic_or_consulate: 'Diplomatic or Consulate',
    avaiation_industry: 'Aviation Industry',
    travel_and_booking_agency: 'Travel and Booking Agency',
    other: 'Other',
};
