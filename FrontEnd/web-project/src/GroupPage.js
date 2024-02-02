import React, { useState, useEffect, useCallback } from "react";
import GroupInfo from "./GroupInfo";
import GroupMembers from "./GroupMembers";
import AddMemberModal from "./AddMemberModal";
import { fetchGroup, deleteGroup, addMember, removeMember } from "./api";

const GroupPage = ({ groupId }) => {
  const [groupInfo, setGroupInfo] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const loadGroup = useCallback(async () => {
    try {
      const groupData = await fetchGroup(groupId);
      setGroupInfo(groupData);
    } catch (error) {
      alert("Error loading group: "+ error);
    }
  }, [groupId]);

  useEffect(() => {
    loadGroup();
  }, [loadGroup]);

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(groupId);
      // Redirect to group list or home page after deleting the group
    } catch (error) {
      alert("Error deleting group: "+ error);
    }
  };

  const handleAddMember = async (newMember) => {
    try {
      await addMember(groupId, newMember);
      loadGroup();
    } catch (error) {
      alert("Error adding member: "+ error);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await removeMember(groupId, memberId);
      loadGroup();
    } catch (error) {
      alert("Error removing member: "+ error);
    }
  };

  return (
    <div className="group-page">
      {groupInfo && (
        <>
          <GroupInfo groupInfo={groupInfo} onDeleteGroup={handleDeleteGroup} />
          <GroupMembers
            members={groupInfo.members}
            onRemoveMember={handleRemoveMember}
          />
          <button onClick={() => setShowAddMemberModal(true)}>
            Add Member
          </button>
          {showAddMemberModal && (
            <AddMemberModal
              onClose={() => setShowAddMemberModal(false)}
              onAddMember={handleAddMember}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GroupPage;
