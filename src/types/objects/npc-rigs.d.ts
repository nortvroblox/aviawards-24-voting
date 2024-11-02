type RigPlaceholder = {
	HumanoidRootPart: Part;
} & Model;

type NPCRigs = {
	Audience: Array<RigPlaceholder> & Folder;
	Nominees: Array<RigPlaceholder> & Folder;
} & Folder;
