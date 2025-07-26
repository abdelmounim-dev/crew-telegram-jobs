#!/usr/bin/env bash

# Create directories and write User Profile schema
mkdir -p src/api/user-profile/content-types/user-profile
cat > src/api/user-profile/content-types/user-profile/schema.json <<EOF
{
  "kind": "collectionType",
  "collectionName": "user_profiles",
  "info": {
    "singularName": "user-profile",
    "pluralName": "user-profiles",
    "displayName": "User Profile",
    "description": "Extended user profile information"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "user": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "plugin::users-permissions.user",
      "inversedBy": "userProfile"
    },
    "userType": {
      "type": "enumeration",
      "enum": ["crew", "owner"],
      "required": true
    },
    "firstName": {
      "type": "string",
      "required": true,
      "maxLength": 50
    },
    "lastName": {
      "type": "string",
      "required": true,
      "maxLength": 50
    },
    "phone": {
      "type": "string",
      "maxLength": 20
    },
    "profilePhoto": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "location": {
      "type": "string",
      "maxLength": 100
    },
    "isActive": {
      "type": "boolean",
      "default": true
    },
    "telegramId": {
      "type": "string",
      "unique": true
    },
    "telegramUsername": {
      "type": "string"
    }
  }
}
EOF

# Create directories and write Crew Profile schema
mkdir -p src/api/crew-profile/content-types/crew-profile
cat > src/api/crew-profile/content-types/crew-profile/schema.json <<EOF
{
  "kind": "collectionType",
  "collectionName": "crew_profiles",
  "info": {
    "singularName": "crew-profile",
    "pluralName": "crew-profiles",
    "displayName": "Crew Profile",
    "description": "Professional profile for yacht crew members"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "userProfile": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::user-profile.user-profile",
      "inversedBy": "crewProfile"
    },
    "position": {
      "type": "enumeration",
      "enum": [
        "captain",
        "chef",
        "deckhand",
        "engineer",
        "stewardess",
        "first_mate",
        "bosun",
        "second_engineer",
        "other"
      ],
      "required": true
    },
    "experienceYears": {
      "type": "integer",
      "min": 0,
      "max": 50
    },
    "bio": {
      "type": "richtext"
    },
    "cv": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["files"]
    },
    "availabilityStatus": {
      "type": "enumeration",
      "enum": ["available", "busy", "not_available"],
      "default": "available"
    },
    "portfolioImages": {
      "type": "media",
      "multiple": true,
      "required": false,
      "allowedTypes": ["images"]
    },
    "certifications": {
      "type": "text"
    },
    "languages": {
      "type": "json"
    },
    "applications": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::application.application",
      "mappedBy": "crew"
    }
  }
}
EOF

# Create directories and write Owner Profile schema
mkdir -p src/api/owner-profile/content-types/owner-profile
cat > src/api/owner-profile/content-types/owner-profile/schema.json <<EOF
{
  "kind": "collectionType",
  "collectionName": "owner_profiles",
  "info": {
    "singularName": "owner-profile",
    "pluralName": "owner-profiles",
    "displayName": "Owner Profile",
    "description": "Profile for yacht owners and managers"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "userProfile": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::user-profile.user-profile",
      "inversedBy": "ownerProfile"
    },
    "companyName": {
      "type": "string",
      "maxLength": 100
    },
    "yachtName": {
      "type": "string",
      "maxLength": 100
    },
    "yachtSize": {
      "type": "string",
      "maxLength": 50
    },
    "description": {
      "type": "richtext"
    },
    "yachtType": {
      "type": "enumeration",
      "enum": ["motor_yacht", "sailing_yacht", "super_yacht", "catamaran", "other"]
    },
    "operatingRegions": {
      "type": "json"
    },
    "jobs": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::job.job",
      "mappedBy": "owner"
    }
  }
}
EOF

# Create directories and write Job schema
mkdir -p src/api/job/content-types/job
cat > src/api/job/content-types/job/schema.json <<EOF
{
  "kind": "collectionType",
  "collectionName": "jobs",
  "info": {
    "singularName": "job",
    "pluralName": "jobs",
    "displayName": "Job",
    "description": "Job postings for yacht crew positions"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "owner": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::owner-profile.owner-profile",
      "inversedBy": "jobs"
    },
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 100
    },
    "description": {
      "type": "richtext",
      "required": true
    },
    "position": {
      "type": "enumeration",
      "enum": [
        "captain",
        "chef",
        "deckhand",
        "engineer",
        "stewardess",
        "first_mate",
        "bosun",
        "second_engineer",
        "other"
      ],
      "required": true
    },
    "location": {
      "type": "string",
      "maxLength": 100
    },
    "startDate": {
      "type": "date"
    },
    "endDate": {
      "type": "date"
    },
    "salaryRange": {
      "type": "string",
      "maxLength": 100
    },
    "status": {
      "type": "enumeration",
      "enum": ["active", "closed", "draft"],
      "default": "active"
    },
    "requirements": {
      "type": "richtext"
    },
    "contactEmail": {
      "type": "email"
    },
    "contactPhone": {
      "type": "string",
      "maxLength": 20
    },
    "contractType": {
      "type": "enumeration",
      "enum": ["permanent", "temporary", "seasonal", "day_work"]
    },
    "experienceRequired": {
      "type": "integer",
      "min": 0
    },
    "applications": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::application.application",
      "mappedBy": "job"
    }
  }
}
EOF

# Create directories and write Application schema
mkdir -p src/api/application/content-types/application
cat > src/api/application/content-types/application/schema.json <<EOF
{
  "kind": "collectionType",
  "collectionName": "applications",
  "info": {
    "singularName": "application",
    "pluralName": "applications",
    "displayName": "Application",
    "description": "Job applications from crew to positions"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "job": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::job.job",
      "inversedBy": "applications"
    },
    "crew": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::crew-profile.crew-profile",
      "inversedBy": "applications"
    },
    "status": {
      "type": "enumeration",
      "enum": ["pending", "viewed", "accepted", "rejected", "withdrawn"],
      "default": "pending"
    },
    "message": {
      "type": "richtext"
    },
    "appliedAt": {
      "type": "datetime"
    },
    "viewedAt": {
      "type": "datetime"
    },
    "respondedAt": {
      "type": "datetime"
    },
    "ownerNotes": {
      "type": "text"
    }
  }
}
EOF

# Create directories and write User schema extension
mkdir -p src/extensions/users-permissions/content-types/user
cat > src/extensions/users-permissions/content-types/user/schema.json <<EOF
{
  "kind": "collectionType",
  "collectionName": "up_users",
  "info": {
    "name": "user",
    "description": "",
    "singularName": "user",
    "pluralName": "users",
    "displayName": "User"
  },
  "options": {
    "draftAndPublish": false,
    "timestamps": true
  },
  "attributes": {
    "username": {
      "type": "string",
      "minLength": 3,
      "unique": true,
      "configurable": false,
      "required": true
    },
    "email": {
      "type": "email",
      "minLength": 6,
      "configurable": false,
      "required": true
    },
    "provider": {
      "type": "string",
      "configurable": false
    },
    "password": {
      "type": "password",
      "minLength": 6,
      "configurable": false,
      "private": true,
      "searchable": false
    },
    "resetPasswordToken": {
      "type": "string",
      "configurable": false,
      "private": true,
      "searchable": false
    },
    "confirmationToken": {
      "type": "string",
      "configurable": false,
      "private": true,
      "searchable": false
    },
    "confirmed": {
      "type": "boolean",
      "default": false,
      "configurable": false
    },
    "blocked": {
      "type": "boolean",
      "default": false,
      "configurable": false
    },
    "role": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "plugin::users-permissions.role",
      "inversedBy": "users",
      "configurable": false
    },
    "userProfile": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::user-profile.user-profile",
      "mappedBy": "user"
    }
  }
}
EOF

echo "All schema files created successfully!"
