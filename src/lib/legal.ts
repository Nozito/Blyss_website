export const LEGAL_EDITOR = {
  denomination: "Noah Dekeyzer",
  forme: "Entrepreneur individuel",
  siege: "66 Impasse des Sitelles, 74210 Doussard, France",
  siret: "934 901 976 00035",
  rcs: "RCS Annecy 934 901 976",
  tva: "TVA non applicable, article 293 B du CGI",
  directeur: "Noah Dekeyzer",
  contact: "contact@blyssapp.fr",
} as const;

export const LEGAL_HOST = {
  nom: "OVH SAS",
  adresse: "2 rue Kellermann, 59100 Roubaix, France",
  rcs: "RCS Lille Métropole 424 761 419 00045",
  ape: "Code APE 2620Z",
  tva: "TVA intracommunautaire FR 22 424 761 419",
} as const;

export const LEGAL_DATA_HOSTING =
  "Les données de la Plateforme sont hébergées dans l'Union européenne, notamment via Supabase sur AWS eu-west-1 (Irlande), sous réserve des traitements réalisés par les prestataires identifiés dans la Politique de confidentialité.";

export const LEGAL_IP_USER_CONTENT =
  "Les contenus publiés par les Utilisateurs restent leur propriété. Ils accordent à Blyss une licence non exclusive, mondiale, gratuite et limitée à la durée de mise en ligne, permettant d'héberger, reproduire, afficher, adapter techniquement et modérer ces contenus pour exploiter la Plateforme.";

export const LEGAL_ABUSE_REPORT =
  "Pour signaler un contenu manifestement illicite, écrivez à contact@blyssapp.fr en indiquant l'URL ou l'identifiant du contenu, le motif précis, les éléments qui le justifient, vos coordonnées et toute pièce utile. Blyss examine les signalements dans les meilleurs délais et peut retirer ou restreindre l'accès au contenu concerné.";

export const CGV_PREAMBLE =
  "Les présentes conditions générales de vente (« CGV ») régissent les abonnements proposés par Blyss — Noah DEKEYZER, entrepreneur individuel, 66 Impasse des Sitelles, 74210 Doussard, SIRET 934 901 976 00035, RCS Annecy 934 901 976, e-mail : contact@blyssapp.fr, aux professionnels indépendants de la beauté et du bien-être (le « Pro »). Elles s'appliquent aux fonctionnalités professionnelles de la Plateforme Blyss : profil public, catalogue de prestations, agenda, réservation, messagerie et outils de gestion associés. Elles ne régissent pas le contrat de prestation conclu directement entre le Pro et ses Clients. Le Pro déclare agir à des fins exclusivement professionnelles.";

export const CGV_LAST_UPDATED = "19 août 2026";

export const CGV_ARTICLES = [
  {
    title: "Offres, prix et commande",
    body: "Les caractéristiques, le prix, la périodicité, les taxes applicables et les fonctionnalités de chaque formule sont affichés sur l'écran d'achat avant validation. Les offres actuellement proposées sont comprises entre 29,99 € et 49,99 € par mois, sous réserve du prix affiché au moment de l'achat. La commande est conclue lorsque le Pro valide l'achat dans l'App Store. Blyss adresse ou met à disposition une confirmation selon les modalités prévues par Apple. Blyss peut modifier ses offres pour l'avenir ; le prix de la période déjà payée n'est pas modifié.",
  },
  {
    title: "Paiement et renouvellement automatique",
    body: "Sur iOS, les abonnements sont vendus par Apple sous forme d'achat intégré et gérés techniquement avec RevenueCat. Le paiement, le renouvellement et, le cas échéant, la facturation sont régis par les conditions Apple applicables au compte du Pro. L'abonnement se renouvelle automatiquement à chaque échéance, sauf résiliation par le Pro au moins 24 heures avant la fin de la période en cours, depuis les réglages de son identifiant Apple. Aucun essai gratuit n'est proposé, sauf mention explicite contraire sur l'écran d'achat. Le Pro peut modifier son offre ou restaurer ses achats depuis l'application, selon les possibilités proposées par Apple. Toute modification prend effet selon les règles indiquées par Apple lors de l'achat.",
  },
  {
    title: "Absence de droit de rétractation",
    body: "Le Pro contracte pour les besoins de son activité professionnelle. Il ne bénéficie donc pas du droit de rétractation réservé aux consommateurs, sauf disposition légale impérative exceptionnelle applicable à sa situation.",
  },
  {
    title: "Obligations du Pro",
    body: "Le Pro fournit des informations exactes, maintenues à jour, et dispose des immatriculations, qualifications, autorisations et assurances nécessaires. Il est seul responsable de ses annonces, prix, disponibilités, prestations, factures, obligations fiscales et sociales, sécurité, hygiène, relation avec les Clients et respect des règles de consommation. Avant toute réservation, le Pro doit présenter les informations légales et précontractuelles qui lui incombent, notamment son identité ou dénomination, son adresse professionnelle, ses coordonnées, ses prix TTC, ses conditions d'exécution, sa politique d'annulation, les informations de rétractation applicables et ses informations d'assurance lorsqu'elles sont obligatoires ou souscrites.",
  },
  {
    title: "Référencement et suspension",
    body: "Le classement par défaut tient compte de la note moyenne et du nombre d'avis, ainsi que de la proximité et des filtres sélectionnés par le Client. La formule d'abonnement, toute rémunération de Blyss ou un placement payant n'ont pas d'incidence sur ce classement. Blyss peut déréférencer, suspendre ou limiter l'accès du Pro en cas de contenu illicite, information trompeuse, fraude, réclamation sérieuse, risque de sécurité ou manquement aux présentes CGV. Sauf urgence, Blyss communique les motifs et permet au Pro de présenter ses observations à contact@blyssapp.fr.",
  },
  {
    title: "Paiements des Clients",
    body: "Les paiements Clients sont traités via Stripe Connect. Blyss ne prélève aucune commission sur ces transactions ; les frais Stripe sont à la charge du Pro. Le Pro fixe seul ses prix et le pourcentage d'acompte. Il est responsable de la justification économique, comptable et fiscale de ses ventes et remboursements. Blyss ou Stripe peut exécuter techniquement un remboursement dans le cadre de la politique présentée au Client, d'une obligation légale, d'une fraude ou d'une erreur manifeste. Cette intervention technique ne modifie pas le fait que le Pro est le vendeur de la prestation.",
  },
  {
    title: "Responsabilité",
    body: "Blyss fournit un service numérique et ne garantit aucun volume de réservations ni aucun niveau de chiffre d'affaires. Blyss n'est pas responsable de l'exécution des prestations du Pro ni de ses relations avec les Clients. Chaque partie répond des dommages directs causés par ses propres manquements.",
  },
  {
    title: "Données personnelles",
    body: "Le Pro et Blyss agissent chacun comme responsables de traitement indépendants pour leurs propres finalités. Le Pro utilise les données des Clients reçues via Blyss uniquement pour préparer, exécuter, gérer et justifier les prestations réservées, répondre à ses obligations légales et traiter les réclamations. Toute réutilisation à des fins de prospection ou de transmission à des tiers requiert une base légale appropriée.",
  },
  {
    title: "Durée, résiliation et droit applicable",
    body: "Les CGV prennent effet à l'achat et s'appliquent pendant toute la durée de l'abonnement. Sa résiliation n'efface pas les obligations liées aux réservations confirmées, paiements, facturation, litiges ou données à conserver légalement. Les présentes CGV sont soumises au droit français. Tout différend professionnel fait d'abord l'objet d'une tentative de résolution amiable auprès de contact@blyssapp.fr.",
  },
] as const;

export const CGU_PREAMBLE =
  "Les présentes conditions générales d'utilisation (« CGU ») régissent l'accès au site blyssapp.fr et à l'application Blyss (la « Plateforme ») par toute personne physique cliente (le « Client »). Blyss met en relation des Clients avec des professionnels indépendants de la beauté et du bien-être (les « Pros »). Blyss fournit un service numérique d'intermédiation, de réservation, de messagerie et de facilitation technique du paiement. Sauf indication expresse contraire, Blyss n'est ni le vendeur ni le prestataire de la prestation réservée : le contrat de prestation est conclu directement entre le Client et le Pro.";

export const CGU_LAST_UPDATED = "19 août 2026";

export const CGU_ARTICLES = [
  {
    title: "Accès et compte",
    body: "La Plateforme est réservée aux personnes âgées d'au moins 16 ans. Un Client mineur de 16 ou 17 ans déclare disposer de l'autorisation de son représentant légal pour créer un compte, accepter les présentes CGU et effectuer une réservation ou un paiement. Le Client fournit des informations exactes et à jour, protège ses identifiants et informe sans délai Blyss de toute utilisation non autorisée de son compte.",
  },
  {
    title: "Informations des Pros et rôle de Blyss",
    body: "Chaque Pro est responsable des informations publiées sur son profil, de ses prix, disponibilités, conditions d'annulation, statut professionnel, assurances, qualifications, déclarations fiscales et sociales, factures, ainsi que de l'exécution de ses prestations. Blyss n'effectue pas de contrôle automatique d'immatriculation, de diplôme, d'assurance ou d'identité des Pros. Une validation ou modération de profil ne constitue donc ni une certification ni une garantie de la qualité ou de la conformité d'un Pro.",
  },
  {
    title: "Référencement, classement et avis",
    body: "Les Pros sont référencés selon leurs catégories et zones déclarées, sous réserve de modération. L'affichage peut tenir compte de la proximité géographique et des filtres choisis par le Client. Le classement par défaut tient compte de la note moyenne et du nombre d'avis. L'abonnement Pro, une rémunération versée à Blyss ou un placement payant n'influencent pas le classement. Un avis ne peut être déposé qu'après une réservation marquée comme réalisée. Les avis peuvent être signalés, puis sont examinés par un modérateur humain. Blyss peut retirer ou rendre invisible un avis contraire à la loi, aux présentes CGU ou aux droits d'un tiers. Aucun avis n'est acheté ni modifié contre rémunération.",
  },
  {
    title: "Réservation et paiement",
    body: "Avant validation, le Client prend connaissance du prix, du montant éventuel de l'acompte et de la politique d'annulation propre au Pro. La réservation est confirmée après validation du paiement requis et émission d'une confirmation dans l'application ou par e-mail. Les prix sont fixés exclusivement par le Pro. Les paiements en ligne sont techniquement traités par Stripe ; Blyss ne stocke pas les numéros complets de carte bancaire. Le Pro peut demander un acompte, imputé sur le prix total. Le solde peut être réglé au Pro sur place ou en ligne selon les fonctionnalités disponibles. Le Pro est seul responsable de l'émission de la facture ou du justificatif correspondant à sa prestation.",
  },
  {
    title: "Annulation, absence et remboursement",
    body: "Chaque Pro fixe un délai d'annulation affiché avant la réservation. Lorsqu'une annulation intervient dans ce délai, l'acompte versé n'est pas remboursé et reste acquis au Pro à titre de compensation, sauf droit impératif contraire ou décision de remboursement après examen du dossier. Lorsqu'un solde a été payé en ligne, il est remboursé intégralement ; en cas de paiement complet, le remboursement correspond au prix payé diminué de l'acompte non remboursable. Une absence ou un retard peut être signalé par le Pro et n'entraîne pas automatiquement un remboursement. Le Client peut contester une situation à contact@blyssapp.fr. Blyss peut administrer techniquement un remboursement via Stripe en cas de fraude, d'erreur manifeste, de risque de sécurité ou d'application de la politique affichée. Cette intervention ne fait pas de Blyss le vendeur de la prestation. Ces règles ne limitent jamais les droits impératifs du Client, notamment le droit de rétractation lorsqu'il est applicable.",
  },
  {
    title: "Droit de rétractation",
    body: "Pour les contrats conclus à distance entre un Client consommateur et un Pro, le droit de rétractation légal s'applique, sauf exception prévue par la loi. Si le Client demande que la prestation commence avant l'expiration du délai de 14 jours, il donne son accord exprès dans une case distincte et reconnaît qu'il perdra ce droit si la prestation est pleinement exécutée avant la fin de ce délai. Avant l'exécution complète, le droit de rétractation reste exercé dans les conditions légales. Le Pro peut alors réclamer la part proportionnée de la prestation déjà exécutée à la demande expresse du Client.",
  },
  {
    title: "Messagerie et comportement",
    body: "La messagerie est réservée aux échanges liés aux réservations. Il est interdit de publier ou transmettre un contenu illégal, injurieux, discriminatoire, violent, sexuellement explicite, frauduleux, publicitaire non sollicité ou portant atteinte aux droits d'autrui. Les Utilisateurs ne doivent pas y transmettre de données de santé, pièces d'identité, coordonnées bancaires ou autres données sensibles. Blyss peut suspendre ou supprimer un compte en cas de fraude, de manquement grave ou de risque pour la sécurité, les droits de tiers ou la Plateforme, après information lorsque cela est possible.",
  },
  {
    title: "Responsabilité",
    body: "Blyss met en œuvre des moyens raisonnables pour assurer le fonctionnement de la Plateforme, sans garantir une disponibilité ininterrompue ni la disponibilité permanente des Pros ou créneaux. Blyss n'est pas responsable de l'exécution, de la qualité, de la sécurité, du résultat ou de la légalité des prestations réalisées par les Pros, ni des dommages résultant de leur relation directe avec le Client, sauf faute propre de Blyss ou obligation légale contraire. Le Client demeure responsable de ses réservations, paiements, contenus et échanges.",
  },
  {
    title: "Données personnelles",
    body: "Les traitements de données sont décrits dans la Politique de confidentialité Blyss. Pour exercer vos droits : privacy@blyssapp.fr.",
  },
  {
    title: "Réclamations, médiation et droit applicable",
    body: "Toute réclamation relative au service Blyss doit être adressée à contact@blyssapp.fr. Les litiges relatifs à la prestation du Pro relèvent en priorité du Pro et, le cas échéant, de son propre médiateur de la consommation. Les présentes CGU sont soumises au droit français, sans priver le Client consommateur des protections impératives de son pays de résidence."
    // En cas d'échec de la réclamation préalable, le Client peut saisir gratuitement le médiateur de la consommation dont relève Blyss : [NOM, ADRESSE POSTALE ET SITE DU MÉDIATEUR À AJOUTER AVANT PUBLICATION]. //,
  },
] as const;

export const PRIVACY_LAST_UPDATED = "19 août 2026";

export const PRIVACY_HERO_DESCRIPTION =
  "Quelles données nous traitons, pourquoi, avec qui elles sont partagées et quels sont vos droits.";

export const PRIVACY_PREAMBLE =
  "Blyss accorde une attention particulière à la protection de vos données personnelles. Cette politique explique quelles données sont traitées lorsque vous utilisez le site blyssapp.fr ou l'application mobile Blyss (ensemble, la « Plateforme »), pourquoi elles le sont, à qui elles sont communiquées et quels sont vos droits.";

export const PRIVACY_SECTIONS = [
  {
    number: 1,
    title: "Responsable du traitement et contact",
    body: "Le responsable du traitement est Blyss - Noah DEKEYZER, entrepreneur individuel, 66 Impasse des Sitelles, 74210 Doussard, France, SIRET : 934 901 976 00035. E-mail général : contact@blyssapp.fr. Contact données personnelles : privacy@blyssapp.fr.",
  },
  {
    number: 2,
    title: "Données que nous traitons",
    items: [
      "Données de compte : nom, prénom, adresse e-mail, numéro de téléphone, date de naissance, identifiants et informations de connexion",
      "Données de profil : photo, ville, adresse, position géographique, informations d'activité professionnelle, catalogue de prestations, prix, disponibilités, liens vers les réseaux sociaux et images publiées",
      "Données de réservation : prestation, Pro ou Client concerné, date et créneau, prix, acompte, statut, annulation, no-show, remboursement et notes associées",
      "Données de paiement : informations nécessaires au suivi du paiement et identifiants techniques transmis par Stripe. Blyss ne stocke pas les numéros complets de carte bancaire",
      "Échanges et contenus : messages liés aux réservations, photos transmises, avis, signalements et éléments de modération",
      "Données techniques : type d'appareil, système d'exploitation, version de l'application, adresse IP, journaux de sécurité, rapports d'erreur et données d'usage",
      "Localisation précise, uniquement lorsque vous l'autorisez depuis votre appareil afin d'utiliser les fonctions de proximité",
      "Face ID et les mécanismes biométriques de l'appareil servent uniquement à déverrouiller localement l'application ; Blyss ne reçoit ni ne conserve votre modèle biométrique",
    ],
  },
  {
    number: 4,
    title: "Données sensibles",
    body: "Blyss ne vous demande pas de données de santé, biométriques, relatives à votre vie sexuelle, origine, convictions ou autres catégories particulières de données. Évitez de transmettre de telles informations dans les messages, avis ou photos. Si vous les communiquez spontanément, Blyss les traite seulement dans la mesure nécessaire à la transmission de votre message, à la sécurité, à la modération, au traitement de votre demande ou à la défense de droits.",
  },
  {
    number: 5,
    title: "Destinataires des données",
    items: [
      "Les personnes habilitées de Blyss",
      "Le Pro ou le Client concerné par votre réservation",
      "Nos prestataires techniques : Supabase/AWS eu-west-1, Stripe et Stripe Connect, Sentry, PostHog, RevenueCat, Expo, Apple, Google lorsque leurs services sont utilisés, et OVH SAS",
      "Les autorités ou tiers auxquels nous sommes légalement tenus de les communiquer",
      "Les Pros et Blyss sont responsables de traitement indépendants : un Pro ne peut utiliser les données reçues via Blyss que pour la prestation réservée, sans réutilisation à des fins de prospection sans base légale appropriée",
    ],
  },
  {
    number: 6,
    title: "Hébergement et transferts hors EEE",
    body: "La base de données principale est hébergée dans l'Union européenne, via Supabase sur AWS eu-west-1 (Irlande). Le site est hébergé par OVH SAS. Certains prestataires peuvent toutefois traiter des données depuis ou vers des pays situés hors de l'Espace économique européen, notamment Stripe, RevenueCat, Expo, Apple ou Google. Lorsque c'est le cas, Blyss s'appuie sur un mécanisme de transfert reconnu par le RGPD, tel qu'une décision d'adéquation ou les clauses contractuelles types de la Commission européenne, accompagnées de mesures complémentaires lorsque nécessaires.",
  },
  {
    number: 7,
    title: "Durées de conservation",
    items: [
      "Comptes inactifs : préavis à 2 ans et 11 mois d'inactivité, puis suppression ou anonymisation à 3 ans",
      "Demande de suppression de compte : traitée sous 30 jours, sous réserve des données devant être conservées pour une obligation légale ou la défense d'un droit",
      "Réservations : anonymisées après 5 ans (données client et notes associées supprimées ou rendues non identifiantes)",
      "Données de paiement et pièces comptables : conservées pendant les durées légales applicables",
      "Coordonnées de localisation : supprimées lors de l'anonymisation du compte",
      "Messages, photos, avis et journaux d'audit : conservés pendant 3 ans pour les messages et photos, 5 ans pour les avis et 12 mois pour les journaux d'audit.",
      // "Sauvegardes : conservées pendant [DURÉE DE RÉTENTION SUPABASE À VÉRIFIER ET À INDIQUER AVANT PUBLICATION]",
    ],
  },
  {
    number: 9,
    title: "Sécurité",
    body: "Blyss met en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données, notamment la limitation des accès, l'authentification, la journalisation et le recours à des prestataires spécialisés. Aucun système n'offrant une sécurité absolue, vous devez également protéger vos appareils et vos identifiants.",
  },
  {
    number: 10,
    title: "Traceurs et paramètres de l'application",
    body: "L'application n'utilise pas de traceur publicitaire ni de suivi inter-apps à des fins de publicité ciblée. Elle utilise notamment Sentry pour le diagnostic d'erreurs et PostHog pour la mesure d'usage et l'amélioration du produit.",
  },
  {
    number: 11,
    title: "Modification de la politique",
    body: "La présente politique peut évoluer pour tenir compte d'une évolution légale, technique ou des services Blyss. En cas de modification substantielle, vous serez informé par un moyen approprié avant son entrée en vigueur lorsque la réglementation l'exige.",
  },
] as const;

export const PRIVACY_PURPOSES_TABLE = [
  {
    purpose: "Créer, administrer et sécuriser votre compte",
    data: "Données de compte et données techniques",
    basis: "Exécution du contrat ; intérêt légitime de sécurité",
  },
  {
    purpose: "Vous mettre en relation, rechercher des Pros et gérer les réservations",
    data: "Profil, localisation autorisée, disponibilités, réservations",
    basis: "Exécution du contrat ; consentement pour la localisation précise",
  },
  {
    purpose: "Traiter les paiements, acomptes, remboursements et justificatifs",
    data: "Réservations et données de paiement",
    basis: "Exécution du contrat ; obligation légale",
  },
  {
    purpose: "Permettre les échanges liés à une réservation",
    data: "Messages et contenus transmis",
    basis: "Exécution du contrat",
  },
  {
    purpose: "Publier et modérer les avis, prévenir les abus et traiter les signalements",
    data: "Avis, signalements et données associées",
    basis: "Intérêt légitime de confiance, sécurité et défense des droits",
  },
  {
    purpose: "Maintenir, sécuriser et améliorer la Plateforme",
    data: "Journaux techniques, rapports d'erreur et données d'usage",
    basis: "Intérêt légitime de fonctionnement et de sécurité ; consentement lorsqu'il est requis",
  },
  {
    purpose: "Respecter nos obligations comptables, fiscales et légales",
    data: "Données de transaction et éléments de preuve",
    basis: "Obligation légale",
  },
] as const;

export const PRIVACY_RIGHTS =
  "Vous disposez, dans les conditions prévues par la réglementation, des droits d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité de vos données. Vous pouvez retirer votre consentement à tout moment pour les traitements fondés sur celui-ci, sans affecter la licéité du traitement déjà réalisé. Vous pouvez exporter certaines de vos données depuis l'application et demander la suppression de votre compte. Blyss répond dans le délai légal applicable et s'efforce de vous adresser un accusé de réception ou une première information sous 48 heures. Vous pouvez également déposer une réclamation auprès de la CNIL : 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou sur www.cnil.fr.";

export const PRIVACY_CONTACT_EMAIL = "privacy@blyssapp.fr";
